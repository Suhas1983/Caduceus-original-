import type { PredictResponseMulti, PredictResponseSingle } from "../types";

interface Props {
  mode: "single" | "multi";
  result: PredictResponseSingle | PredictResponseMulti | null;
  loading: boolean;
  onBackToInput: () => void;
  onRunShap: () => void;
  showShapButton: boolean;
}

export default function ResultsCard({
  mode,
  result,
  loading,
  onBackToInput,
  onRunShap,
  showShapButton,
}: Props) {
  if (!result) {
    return (
      <section className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-lg">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-slate-100 p-4">
            <svg className="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-700">No Results Yet</h3>
          <p className="mt-2 text-sm text-slate-500">Run an analysis to see predictions here</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl">
      {/* Header with gradient background */}
      <div className="rounded-t-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Analysis Results</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onBackToInput}
              className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Input
            </button>
            {showShapButton && (
              <button
                onClick={onRunShap}
                disabled={loading}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-lg transition ${
                  loading
                    ? "bg-slate-300 text-slate-500"
                    : "bg-white text-indigo-600 hover:bg-indigo-50 hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running SHAP…
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Run SHAP Analysis
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {mode === "single" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={`group relative overflow-hidden rounded-xl border p-6 shadow-sm transition hover:shadow-md ${
              (result as PredictResponseSingle).result.toLowerCase() === 'positive' 
                ? 'border-red-200 bg-gradient-to-br from-red-50 to-white' 
                : 'border-green-200 bg-gradient-to-br from-green-50 to-white'
            }`}>
              <div className="absolute right-4 top-4 opacity-10 transition group-hover:opacity-20">
                {(result as PredictResponseSingle).result.toLowerCase() === 'positive' ? (
                  <svg className="h-12 w-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="h-12 w-12 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="relative">
                <div className={`mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
                  (result as PredictResponseSingle).result.toLowerCase() === 'positive' 
                    ? 'text-red-600' 
                    : 'text-green-600'
                }`}>
                  <div className={`h-1.5 w-1.5 rounded-full ${
                    (result as PredictResponseSingle).result.toLowerCase() === 'positive' 
                      ? 'bg-red-500' 
                      : 'bg-green-500'
                  }`}></div>
                  Result
                </div>
                <div className={`mt-2 text-2xl font-bold ${
                  (result as PredictResponseSingle).result.toLowerCase() === 'positive' 
                    ? 'text-red-700' 
                    : 'text-green-700'
                }`}>
                  {(result as PredictResponseSingle).result}
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm transition hover:shadow-md">
              <div className="absolute right-4 top-4 opacity-10 transition group-hover:opacity-20">
                <svg className="h-12 w-12 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="relative">
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                  Confidence
                </div>
                <div className="mt-2 text-2xl font-bold text-slate-800">
                  {(result as PredictResponseSingle).confidence}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Detected diseases section */}
            <div className="mb-6 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-emerald-100 p-1.5">
                  <svg className="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-emerald-900">
                  Detected Syndromes
                  <span className="ml-2 text-xs font-normal text-emerald-600">(≥ Threshold)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(result as PredictResponseMulti).detected.map((d, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:shadow-md"
                  >
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Probability table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-3">
                <h3 className="text-sm font-bold text-slate-700">Probability Rankings</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">#</th>
                      <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Disease</th>
                      <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Probability</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {(result as PredictResponseMulti).top_results.map(
                      ([name, prob], i) => (
                        <tr key={i} className="transition hover:bg-slate-50">
                          <td className="border-b border-slate-100 px-4 py-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                              {i + 1}
                            </span>
                          </td>
                          <td className="border-b border-slate-100 px-4 py-3 font-medium text-slate-800">{name}</td>
                          <td className="border-b border-slate-100 px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                  <div 
                                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                    style={{ width: `${prob * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span className="min-w-[60px] text-right font-semibold text-slate-700">
                                {(prob * 100).toFixed(2)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}