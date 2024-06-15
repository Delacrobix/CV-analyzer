import React from "react";
import { useGlobalStateVariables } from "../state/globalVariablesState";
import Dashboard from "../components/dashboard";
import { OCRAnalysisResponse } from "../utils/types";

export default function Analysis() {
  const { analysisResult } = useGlobalStateVariables();

  const [data, setData] = React.useState<OCRAnalysisResponse | null>(null);

  React.useEffect(() => {
    if (!analysisResult) return;

    setData(analysisResult);
  }, [analysisResult]);

  return (
    <div className='h-full'>
      <Dashboard cvAnalysisDataString={data} />
    </div>
  );
}
