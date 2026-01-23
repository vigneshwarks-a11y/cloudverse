import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/Button";
import { track } from "@/lib/track";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { EfficiencySnapshotModal, type AnalysisResult } from "./EfficiencySnapshotModal";

type State = "idle" | "processing" | "result" | "error";

async function analyzeInvoice(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("invoice", file);

  const response = await fetch("/api/invoice-analysis", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Failed to analyze invoice" }));
    throw new Error(error.error || "Failed to analyze invoice");
  }

  return response.json();
}

const ACCEPTED_TYPES = [".pdf", ".csv", ".xlsx"];
const ACCEPTED_MIME = [
  "application/pdf",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
const MAX_SIZE_MB = 20;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

function validateFile(file: File): string | null {
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ACCEPTED_TYPES.includes(ext) && !ACCEPTED_MIME.includes(file.type)) {
    return `Unsupported file type. Please upload PDF, CSV, or XLSX.`;
  }
  if (file.size > MAX_SIZE_BYTES) {
    return `File too large. Maximum size is ${MAX_SIZE_MB}MB.`;
  }
  return null;
}

export function InvoiceEfficiencySection() {
  const [state, setState] = useState<State>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    const error = validateFile(file);
    if (error) {
      setErrorMessage(error);
      setState("error");
      return;
    }

    track("invoice_upload", { fileType: file.type, fileSize: file.size });
    setState("processing");
    setErrorMessage("");

    try {
      const analysisResult = await analyzeInvoice(file);
      setState("result");
      setResult(analysisResult);
      setModalOpen(true);
      track("invoice_analysis_complete", { score: analysisResult.score });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to analyze invoice");
      setState("error");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const resetState = () => {
    setState("idle");
    setResult(null);
    setErrorMessage("");
    setModalOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <section className="py-10 sm:py-12 lg:py-14">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cv-muted">
              Instant Efficiency Snapshot
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-cv-ink leading-tight">
              Know how efficient your cloud is?
            </h2>
            <p className="text-base sm:text-lg text-cv-muted leading-relaxed max-w-xl mx-auto">Upload a cloud invoice and receive a read-only efficiency snapshot. We highlight your waste signals, coverage gaps, and optimization potential.</p>

            {/* Upload Card */}
            <div className="mt-8 max-w-md mx-auto">
              {/* Idle State */}
              {state === "idle" && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    isDragOver
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-cv-line hover:border-blue-400 hover:bg-blue-500/5"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload invoice file"
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInputRef.current?.click()}
                  data-testid="upload-dropzone"
                >
                  <Upload className="w-10 h-10 mx-auto mb-4 text-cv-muted" />
                  <p className="text-base font-medium text-cv-ink mb-2">
                    Drop invoice here or click to upload
                  </p>
                  <p className="text-sm text-cv-muted">
                    PDF, CSV, or XLSX • Max {MAX_SIZE_MB}MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={ACCEPTED_TYPES.join(",")}
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="File upload input"
                    data-testid="file-input"
                  />
                </div>
              )}

              {/* Processing State */}
              {state === "processing" && (
                <div className="border-2 border-cv-line rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-blue-500 animate-pulse" />
                  </div>
                  <p className="text-base font-medium text-cv-ink mb-4">Analyzing invoice…</p>
                  <div className="w-48 h-2 mx-auto bg-cv-line rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-shimmer" 
                         style={{ backgroundSize: "200% 100%" }} />
                  </div>
                </div>
              )}

              {/* Error State */}
              {state === "error" && (
                <div className="border-2 border-red-500/20 rounded-2xl p-8 text-center bg-red-500/5">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-red-500" />
                  </div>
                  <p className="text-sm font-medium text-red-500 mb-4" data-testid="error-message">
                    {errorMessage}
                  </p>
                  <Button variant="secondary" onClick={resetState} data-testid="button-try-again">
                    Try again
                  </Button>
                </div>
              )}

              {/* Result State - Inline Status */}
              {state === "result" && result && (
                <div className="border-2 border-green-500/30 rounded-2xl p-6 text-center bg-green-500/5">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-base font-medium text-cv-ink">Snapshot ready</p>
                      <p className="text-sm text-cv-muted">Score: {result.score}/100</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => setModalOpen(true)} 
                      className="flex-1"
                      data-testid="button-view-snapshot"
                    >
                      View snapshot
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={resetState} 
                      className="flex-1"
                      data-testid="button-upload-another"
                    >
                      Upload another
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-cv-muted/70 pt-4">
              Read-only analysis. No credentials required. Files encrypted in transit and deleted after processing.
            </p>
          </div>
        </div>
      </section>
      <EfficiencySnapshotModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        result={result}
        onUploadAnother={resetState}
      />
    </>
  );
}
