import { useState, useRef } from "react";

// Type definitions
interface ShapResponse {
  summary?: string;
  plots: string[];
}

interface Props {
  shapData: ShapResponse;
  onBack: () => void;
}

export default function ShapGallery({ shapData, onBack }: Props) {
  const [downloading, setDownloading] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Safety check
  if (!shapData || !shapData.plots) {
    return (
      <section className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-slate-100 p-4">
            <svg className="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-700">No SHAP Data Available</h3>
          <p className="mt-2 text-sm text-slate-500">Run a SHAP analysis to see results here</p>
          <button
            onClick={onBack}
            className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            ← Back to Predictions
          </button>
        </div>
      </section>
    );
  }

  const handleDownloadPage = async () => {
    setDownloading(true);
    try {
      // Create a printable version
      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>SHAP Analysis Report</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              padding: 40px;
              max-width: 1200px;
              margin: 0 auto;
              background: #f8f9fa;
            }
            .header {
              background: linear-gradient(to right, #7c3aed, #9333ea);
              color: white;
              padding: 30px;
              border-radius: 16px;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0 0 5px 0;
              font-size: 28px;
            }
            .header p {
              margin: 0;
              opacity: 0.9;
              font-size: 14px;
            }
            .summary {
              background: white;
              border: 2px solid #dbeafe;
              border-radius: 12px;
              padding: 20px;
              margin-bottom: 30px;
            }
            .summary h2 {
              color: #1e40af;
              margin: 0 0 15px 0;
              font-size: 18px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .summary pre {
              margin: 0;
              white-space: pre-wrap;
              font-family: 'Courier New', monospace;
              font-size: 13px;
              line-height: 1.6;
              color: #334155;
            }
            .stats {
              background: white;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 15px 20px;
              margin-bottom: 30px;
              font-size: 14px;
              color: #64748b;
            }
            .gallery {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
              gap: 24px;
            }
            .plot-card {
              background: white;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .plot-image {
              width: 100%;
              height: auto;
              display: block;
              background: linear-gradient(to bottom right, #f1f5f9, #e2e8f0);
              padding: 10px;
            }
            .plot-footer {
              padding: 15px;
              border-top: 1px solid #f1f5f9;
            }
            .plot-title {
              font-weight: 600;
              color: #334155;
              margin: 0 0 5px 0;
              font-size: 14px;
            }
            .plot-subtitle {
              color: #94a3b8;
              margin: 0;
              font-size: 12px;
            }
            .plot-number {
              display: inline-block;
              background: linear-gradient(to right, #7c3aed, #9333ea);
              color: white;
              padding: 4px 12px;
              border-radius: 999px;
              font-size: 11px;
              font-weight: bold;
              margin-bottom: 8px;
            }
            @media print {
              body { background: white; padding: 20px; }
              .plot-card { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SHAP Analysis Report</h1>
            <p>Feature Importance & Interpretability</p>
          </div>
          
          ${shapData.summary ? `
            <div class="summary">
              <h2>📊 Analysis Summary</h2>
              <pre>${shapData.summary}</pre>
            </div>
          ` : ''}
          
          <div class="stats">
            <strong>${shapData.plots.length}</strong> visualization${shapData.plots.length !== 1 ? 's' : ''} generated
          </div>
          
          <div class="gallery">
            ${shapData.plots.map((url, i) => {
              const filename = url.split("/").pop() || "";
              const displayName = filename.replace(/_/g, " ").replace(".png", "");
              return `
                <div class="plot-card">
                  <div style="padding: 12px 12px 0 12px;">
                    <span class="plot-number">#${i + 1}</span>
                  </div>
                  <img src="${url}" alt="Plot ${i + 1}" class="plot-image" />
                  <div class="plot-footer">
                    <p class="plot-title">${displayName}</p>
                    <p class="plot-subtitle">SHAP Visualization</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob([printContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'shap_analysis_report.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <section className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl">
        {/* Header with gradient background */}
        <div className="rounded-t-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">SHAP Analysis</h2>
                <p className="text-xs text-violet-100">Feature Importance & Interpretability</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onBack}
                className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Predictions
              </button>
              <button
                onClick={handleDownloadPage}
                disabled={downloading}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-lg transition ${
                  downloading
                    ? "bg-slate-300 text-slate-500"
                    : "bg-white text-violet-600 hover:bg-violet-50 hover:shadow-xl"
                }`}
              >
                {downloading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Summary section */}
          {shapData.summary && (
            <div className="mb-6 overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm">
              <div className="border-b border-blue-200 bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-blue-600 p-1.5">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-blue-900">Analysis Summary</h3>
                </div>
              </div>
              <div className="p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-700">{shapData.summary}</pre>
              </div>
            </div>
          )}

          {/* Stats bar */}
          <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white px-5 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="h-5 w-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold">{shapData.plots.length}</span>
              <span>visualization{shapData.plots.length !== 1 ? 's' : ''} generated</span>
            </div>
            <div className="text-xs text-slate-500">Click any plot to view full size</div>
          </div>

          {/* Plot gallery */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shapData.plots.map((url, i) => {
              const filename = url.split("/").pop() || "";
              const displayName = filename.replace(/_/g, " ").replace(".png", "");
              return (
                <div
                  key={i}
                  onClick={() => setSelectedPlot(i)}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                    <img
                      src={url}
                      alt={`Plot ${i + 1}`}
                      className="h-56 w-full object-contain p-2 transition duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/800x400?text=Image+Not+Found";
                      }}
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      #{i + 1}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-100"></div>
                    <div className="absolute bottom-3 right-3 rounded-full bg-white/90 p-2 opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100">
                      <svg className="h-4 w-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 bg-gradient-to-br from-white to-slate-50 px-4 py-3">
                    <div className="truncate text-sm font-semibold text-slate-700 group-hover:text-violet-600">
                      {displayName}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">SHAP Visualization</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox modal */}
      {selectedPlot !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPlot(null)}
        >
          <div className="relative max-h-[90vh] max-w-6xl overflow-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-sm">
              <div className="font-semibold text-slate-700">
                Plot #{selectedPlot + 1} - {shapData.plots[selectedPlot].split("/").pop()?.replace(/_/g, " ").replace(".png", "")}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlot(null);
                }}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <img
                src={shapData.plots[selectedPlot]}
                alt={`Plot ${selectedPlot + 1}`}
                className="w-full"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}