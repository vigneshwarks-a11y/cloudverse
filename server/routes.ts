import { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { parseInvoice } from "./invoice-parser";
import { insertPartnerInquirySchema, insertDemoInquirySchema, insertSubscriberSchema } from "@shared/schema";
import multer from "multer";
import { promises as fs } from "fs";
import * as XLSX from "xlsx";
import pdfjsLib from "./pdfjs.cjs";


const upload = multer({
  dest: "/tmp/uploads/",
  limits: { fileSize: 20 * 1024 * 1024 },
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

/**
 * =========================================================
 * PDF extraction
 * =========================================================
 */

async function extractPdfText(
  buffer: Buffer
): Promise<{ text: string; numpages: number }> {
  const uint8Array = new Uint8Array(buffer);

  const pdfDocument = await (pdfjsLib as any)
    .getDocument({
      data: uint8Array,
      disableWorker: true, // 🔑 REQUIRED
    })
    .promise;

  let extractedText = "";

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const textContent = await page.getTextContent();
    extractedText +=
      textContent.items.map((item: any) => item.str).join(" ") + "\n";
  }

  return { text: extractedText, numpages: pdfDocument.numPages };
}

/**
 * =========================================================
 * Routes
 * =========================================================
 */

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/partners/inquiry", async (req, res) => {
    try {
      const data = insertPartnerInquirySchema.parse(req.body);
      res.json(await storage.createPartnerInquiry(data));
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/demo/inquiry", async (req, res) => {
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

  // Subscribe endpoint
  app.post("/api/subscribe", async (req: Request, res: Response) => {
    try {
      const data = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.createSubscriber(data);
      res.json(subscriber);
    } catch (error: any) {
      console.error("Subscribe error:", error);
      if (error.code === "23505") {
        res.status(400).json({ error: "This email is already subscribed." });
      } else {
        res.status(400).json({ 
          error: error instanceof Error ? error.message : "Invalid subscriber data" 
        });
      }
    }
  });

  app.post(
    "/api/invoice-analysis",
    upload.single("invoice"),
    async (req: Request, res: Response) => {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath = req.file.path;
      const fileName = req.file.originalname;

      try {
        const ext = fileName.split(".").pop()?.toLowerCase();
        let fileContent = "";

        if (ext === "csv") {
          fileContent = await fs.readFile(filePath, "utf-8");
        } else if (ext === "xlsx" || ext === "xls") {
          const buffer = await fs.readFile(filePath);
          const workbook = XLSX.read(buffer, { type: "buffer" });
          fileContent = workbook.SheetNames.map((name) => {
            const sheet = workbook.Sheets[name];
            return `=== Sheet: ${name} ===\n${XLSX.utils.sheet_to_csv(sheet)}`;
          }).join("\n\n");
        } else if (ext === "pdf") {
          const buffer = await fs.readFile(filePath);
          const pdfData = await extractPdfText(buffer);
          fileContent = pdfData.text;

          if (!fileContent.trim() || fileContent.length < 50) {
            fileContent = `[PDF file: ${fileName}]
Scanned or image-based PDF.
File size: ${buffer.length} bytes
Pages: ${pdfData.numpages}`;
          }
        } else {
          fileContent = await fs.readFile(filePath, "utf-8");
        }

        res.json(await parseInvoice(fileContent, fileName));
      } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
      } finally {
        await fs.unlink(filePath).catch(() => { });
      }
    }
  );

  return httpServer;
}
