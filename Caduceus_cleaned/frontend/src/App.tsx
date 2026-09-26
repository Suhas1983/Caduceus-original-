import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import InputCard from "./components/InputCard";
import ResultsCard from "./components/ResultsCard";
import ShapGallery from "./components/ShapGallery";
import Footer from "./components/Footer";
import type {
  PredictResponseSingle,
  PredictResponseMulti,
  ShapResponse,
} from "./types";

type Tab = "input" | "predictions" | "analysis";

// ⛳ Paste your fresh ngrok URL here each session (no leading/trailing spaces —
// a leading space here previously broke every API call silently)
const BACKEND_URL = "https://tumble-dancing-maternity.ngrok-free.dev";

export default function App() {
  const [tab, setTab] = useState<Tab>("input");
  const [patientId, setPatientId] = useState("");
  const [sequence, setSequence] = useState("");
  const [mode, setMode] = useState<"single" | "multi">("single");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [result, setResult] = useState<
    PredictResponseSingle | PredictResponseMulti | null
  >(null);

  const [shapData, setShapData] = useState<ShapResponse | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setShapData(null);

    try {
      const res = await axios.post(`${BACKEND_URL}/predict`, { sequence, mode });
      setResult(res.data);
      setTab("predictions");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleShap = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${BACKEND_URL}/shap`, { sequence, mode });
      setShapData(res.data);
      setTab("analysis");
    } catch (err: any) {
      setError(err?.response?.data?.error || "SHAP analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  // Single-label => show SHAP only when result === "POSITIVE"
  const canShowShapButton =
    !!result &&
    ((mode === "single" &&
      (result as PredictResponseSingle)?.result?.toUpperCase() === "POSITIVE") ||
      mode === "multi");

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-800">
      <Header tab={tab} onTabChange={setTab} />

      <main className="max-w-5xl mx-auto px-5 pb-24">
        {tab === "input" && (
          <InputCard
            patientId={patientId}
            setPatientId={setPatientId}
            sequence={sequence}
            setSequence={setSequence}
            mode={mode}
            setMode={(m) => {
              setMode(m);
              setResult(null);
              setShapData(null);
            }}
            onAnalyze={handlePredict}
            loading={loading}
          />
        )}

        {tab === "predictions" && (
          <ResultsCard
            mode={mode}
            result={result}
            loading={loading}
            onBackToInput={() => setTab("input")}
            onRunShap={handleShap}
            showShapButton={canShowShapButton}
          />
        )}

        {tab === "analysis" && shapData && (
          <ShapGallery shapData={shapData} onBack={() => setTab("predictions")} />
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
            {error}
          </div>
        )}
      </main>
        <Footer />
    </div>
  );
}
