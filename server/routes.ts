import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { parseInvoice } from "./invoice-parser";
import { insertPartnerInquirySchema, insertDemoInquirySchema } from "@shared/schema";
import multer from "multer";
import { promises as fs } from "fs";
import path from "path";
import * as XLSX from "xlsx";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// Configure multer for file uploads
const upload = multer({
  dest: "/tmp/uploads/",
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    const allowedExts = [".pdf", ".csv", ".xlsx", ".xls"];
    const ext = "." + file.originalname.split(".").pop()?.toLowerCase();
    
    if (allowedTypes.includes(file.mimetype) || allowedExts.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"));
    }
  },
});

async function extractPdfText(buffer: Buffer): Promise<{ text: string; numpages: number }> {
  const uint8Array = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  
  const loadingTask = pdfjsLib.getDocument({
    data: uint8Array,
    useSystemFonts: true,
  });
  
  const pdfDocument = await loadingTask.promise;
  let extractedText = "";
  
  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(" ");
    extractedText += pageText + "\n";
  }
  
  return { text: extractedText, numpages: pdfDocument.numPages };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Partner inquiry endpoint
  app.post("/api/partners/inquiry", async (req: Request, res: Response) => {
    try {
      const data = insertPartnerInquirySchema.parse(req.body);
      const inquiry = await storage.createPartnerInquiry(data);
      res.json(inquiry);
    } catch (error: any) {
      console.error("Partner inquiry error:", error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid inquiry data" 
      });
    }
  });

  // Demo inquiry endpoint
  app.post("/api/demo/inquiry", async (req: Request, res: Response) => {
    try {
      const data = insertDemoInquirySchema.parse(req.body);
      const inquiry = await storage.createDemoInquiry(data);
      res.json(inquiry);
    } catch (error: any) {
      console.error("Demo inquiry error:", error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid demo inquiry data" 
      });
    }
  });

  // Invoice analysis endpoint
  app.post("/api/invoice-analysis", upload.single("invoice"), async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;
    
    try {
      const ext = fileName.split(".").pop()?.toLowerCase();
      
      let fileContent: string;
      
      if (ext === "csv") {
        fileContent = await fs.readFile(filePath, "utf-8");
      } else if (ext === "xlsx" || ext === "xls") {
        const buffer = await fs.readFile(filePath);
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheets: string[] = [];
        for (const sheetName of workbook.SheetNames) {
          const sheet = workbook.Sheets[sheetName];
          const csv = XLSX.utils.sheet_to_csv(sheet);
          sheets.push(`=== Sheet: ${sheetName} ===\n${csv}`);
        }
        fileContent = sheets.join("\n\n");
      } else if (ext === "pdf") {
        const buffer = await fs.readFile(filePath);
        const pdfData = await extractPdfText(buffer);
        fileContent = pdfData.text;
        
        if (!fileContent || fileContent.trim().length < 50) {
          fileContent = `[PDF file: ${fileName}]\nExtracted text was minimal or empty. This may be a scanned/image-based PDF.\nFile size: ${buffer.length} bytes\nPages: ${pdfData.numpages || 'unknown'}`;
        }
      } else {
        fileContent = await fs.readFile(filePath, "utf-8");
      }

      // Parse the invoice with AI
      const result = await parseInvoice(fileContent, fileName);
      
      res.json(result);
    } catch (error) {
      console.error("Invoice analysis error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to analyze invoice" 
      });
    } finally {
      // Clean up the uploaded file
      await fs.unlink(filePath).catch(() => {});
    }
  });

  return httpServer;
}
