import React from "react";
import { useGlobalStateVariables } from "../state/globalVariablesState";
import Dashboard from "../components/dashboard";

export default function Analysis() {
  const { analysisResult } = useGlobalStateVariables();

  const [data, setData] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!analysisResult) return;

    setData(analysisResult);
  }, [analysisResult]);

  return (
    <div className='h-full'>
      <Dashboard data={data} />
    </div>
  );
}
