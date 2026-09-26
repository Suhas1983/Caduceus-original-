import { motion } from "framer-motion";
import type { PredictResponseSingle, PredictResponseMulti, ShapResponse } from "../types";

interface Props {
  result: PredictResponseSingle | PredictResponseMulti | null;
  loading: boolean;
  onShap: () => void;
  shapData: ShapResponse | null;
  mode: "single" | "multi";
}

export default function ResultsPanel({ result, loading, onShap, shapData, mode }: Props) {
  if (loading) return null;
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/70 rounded-2xl p-6 shadow-xl"
    >
      {mode === "single" ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Prediction Result</h2>
          <p className="text-lg">
            <strong>Result:</strong> {(result as any).result}
          </p>
          <p className="text-lg">
            <strong>Confidence:</strong> {(result as any).confidence}
          </p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-3">Detected Diseases</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {(result as any).detected.map((d: string, i: number) => (
              <span
                key={i}
                className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 px-3 py-1 rounded-full text-sm"
              >
                {d}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2">Top Predictions</h3>
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="py-1">#</th>
                <th>Disease</th>
                <th>Probability</th>
              </tr>
            </thead>
            <tbody>
              {(result as any).top_results.map(([d, p]: [string, number], i: number) => (
                <tr key={i} className="border-b border-slate-700">
                  <td>{i + 1}</td>
                  <td>{d}</td>
                  <td>{(p * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={onShap}
          disabled={loading}
          className={`px-5 py-2 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {shapData ? "Re-run SHAP" : "Show SHAP Results"}
        </button>
      </div>
    </motion.div>
  );
}
