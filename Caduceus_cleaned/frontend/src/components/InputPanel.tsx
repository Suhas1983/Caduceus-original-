interface Props {
  sequence: string;
  setSequence: (v: string) => void;
  mode: "single" | "multi";
  setMode: (v: "single" | "multi") => void;
  onPredict: () => void;
  loading: boolean;
}

export default function InputPanel({
  sequence,
  setSequence,
  mode,
  setMode,
  onPredict,
  loading,
}: Props) {
  return (
    <div className="bg-slate-800/70 rounded-2xl p-6 shadow-xl space-y-4">
      <label className="block text-lg font-semibold mb-1">DNA Sequence</label>
      <textarea
        value={sequence}
        onChange={(e) => setSequence(e.target.value)}
        rows={5}
        placeholder="Enter your DNA sequence (A, T, C, G)..."
        className="w-full p-3 rounded-lg text-black"
      />

      <div className="flex flex-wrap justify-between items-center">
        <div className="space-x-4">
          <label className="text-sm">Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "single" | "multi")}
            className="bg-slate-700 text-white px-3 py-2 rounded-md"
          >
            <option value="single">Single Label</option>
            <option value="multi">Multi Label</option>
          </select>
        </div>

        <button
          onClick={onPredict}
          disabled={loading || !sequence}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600"
          }`}
        >
          {loading ? "Processing..." : "Predict"}
        </button>
      </div>
    </div>
  );
}
