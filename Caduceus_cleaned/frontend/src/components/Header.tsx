interface Props {
  tab: "input" | "predictions" | "analysis";
  onTabChange: (t: Props["tab"]) => void;
}

export default function Header({ tab, onTabChange }: Props) {
  const TabBtn = ({
    value,
    label,
    icon,
  }: {
    value: Props["tab"];
    label: string;
    icon: React.ReactNode;
  }) => {
    const active = tab === value;
    return (
      <button
        onClick={() => onTabChange(value)}
        className={`group relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
          active
            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        <span className={active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}>
          {icon}
        </span>
        {label}
        {active && (
          <div className="absolute -bottom-0.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-white/50"></div>
        )}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-lg">
      {/* Main Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            {/* Logo/Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Caduceus DNA Analysis
              </h1>
              <p className="text-xs text-slate-500">
                Advanced genomic disease prediction using transformer models
              </p>
            </div>
          </div>


          
          </div>
        </div>
      

      {/* Navigation Tabs */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-1 px-6 py-2">
          <TabBtn
            value="input"
            label="Sequence Input"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <TabBtn
            value="predictions"
            label="Disease Predictions"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <TabBtn
            value="analysis"
            label="Analysis Details"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </header>
  );
}