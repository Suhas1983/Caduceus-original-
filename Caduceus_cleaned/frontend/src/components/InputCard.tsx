interface Props {
  patientId: string;
  setPatientId: (v: string) => void;
  sequence: string;
  setSequence: (v: string) => void;
  mode: "single" | "multi";
  setMode: (v: "single" | "multi") => void;
  onAnalyze: () => void;
  loading: boolean;
}

export default function InputCard({
  patientId,
  setPatientId,
  sequence,
  setSequence,
  mode,
  setMode,
  onAnalyze,
  loading,
}: Props) {
  const length = sequence.length;
  const tooLong = length > 104;

  return (
    <section className="mt-8  overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl">
      {/* Header with gradient background */}
      <div className="rounded-t-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">DNA Sequence Analysis</h2>
            <p className="text-xs text-indigo-100">Duchenne muscular dystrophy</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Patient ID and Classifier Type */}
        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Patient ID */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <svg className="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Patient ID
              <span className="text-xs font-normal text-slate-500">(Optional)</span>
            </label>
            <div className="relative">
              <input
                value={patientId}
                onChange={(e) => {
                      const input = e.target.value.toUpperCase();
                      const filtered = input.replace(/[^ATGC]/g, ""); // remove anything except A, T, G, C
                      setSequence(filtered);
                    }}

                placeholder="Enter patient identifier"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          {/* Classifier Type */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <svg className="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Classifier Type
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setMode("single")}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  mode === "single"
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200"
                    : "border-2 border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50"
                }`}
              >
                {mode === "single" && (
                  <svg className="mr-1 inline h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                Single Label
              </button>
              <button
                onClick={() => setMode("multi")}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  mode === "multi"
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200"
                    : "border-2 border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50"
                }`}
              >
                {mode === "multi" && (
                  <svg className="mr-1 inline h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                Multi-Label
              </button>
            </div>
          </div>
        </div>

        {/* DNA Sequence Input */}
        <div className="mb-2">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <svg className="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            DNA Sequence
          </label>
          <div className="relative">
            <textarea
              value={sequence}
              onChange={(e) => setSequence(e.target.value.toUpperCase())}
              rows={6}
              placeholder="Enter DNA sequence (A, T, C, G)...&#10;&#10;Example: ATCGATCGATCG"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <div className="absolute bottom-3 right-3">
              <div className={`rounded-full px-3 py-1 text-xs font-semibold ${
                tooLong 
                  ? "bg-red-100 text-red-700" 
                  : length > 0 
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-slate-100 text-slate-500"
              }`}>
                {length} / 104
              </div>
            </div>
          </div>
          {tooLong && (
            <div className="mt-2 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Sequence exceeds 104 nucleotides and will be truncated on the server
              </span>
            </div>
          )}
        </div>

        {/* Info Callout */}
        <div className={`mb-6 mt-5 overflow-hidden rounded-xl border shadow-sm ${
          mode === "single" 
            ? "border-blue-200 bg-gradient-to-br from-blue-50 to-white"
            : "border-purple-200 bg-gradient-to-br from-purple-50 to-white"
        }`}>
          <div className={`px-4 py-3 ${
            mode === "single" ? "bg-blue-100/50" : "bg-purple-100/50"
          }`}>
            <div className="flex items-center gap-2">
              <div className={`rounded-lg p-1.5 ${
                mode === "single" ? "bg-blue-600" : "bg-purple-600"
              }`}>
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`text-sm font-bold ${
                mode === "single" ? "text-blue-900" : "text-purple-900"
              }`}>
                {mode === "single" ? "Binary Classification Model" : "Multi-Label Classification Model"}
              </h3>
            </div>
          </div>
          <div className="px-4 py-3 text-sm text-slate-700">
            {mode === "single" ? (
              <p>
                This model classifies sequences as <span className="font-semibold text-red-600">POSITIVE</span> or{" "}
                <span className="font-semibold text-green-600">NEGATIVE</span> for disease markers. Maximum sequence length is{" "}
                <span className="font-semibold text-slate-800">104 nucleotides</span>.
              </p>
            ) : (
              <p>
                This model predicts multiple diseases with probabilities. Maximum
                sequence length is <span className="font-semibold text-slate-800">104 nucleotides</span>.
              </p>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={onAnalyze}
          disabled={loading || !sequence.trim()}
          className={`group relative w-full overflow-hidden rounded-xl px-6 py-4 text-center font-semibold text-white shadow-lg transition ${
            loading || !sequence.trim()
              ? "cursor-not-allowed bg-slate-400"
              : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-xl hover:shadow-indigo-200"
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing DNA Sequence...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Analyze DNA Sequence
              </>
            )}
          </span>
          {!loading && !(!sequence.trim()) && (
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 transition group-hover:opacity-100"></div>
          )}
        </button>
      </div>
    </section>
  );
}