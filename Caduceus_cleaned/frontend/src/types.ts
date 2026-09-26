export interface PredictResponseSingle {
  result: string;
  confidence: string;
}

export interface PredictResponseMulti {
  top_results: [string, number][];
  detected: string[];
}

export interface ShapResponse {
  message: string;
  plots: string[];
  summary?: string;
}
