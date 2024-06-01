import React from "react";
import { CvAnalysisResponse } from "../utils/types";

type Data = {
  aiResponse: string;
};

interface DashboardProps {
  data: Data | null;
}

export default function Dashboard({ data }: Readonly<DashboardProps>) {
  const [jsonData, setJsonData] = React.useState<CvAnalysisResponse | null>(
    null
  );

  React.useEffect(() => {
    if (!data) return;

    setJsonData(JSON.parse(data.aiResponse));
  }, [data]);

  React.useEffect(() => {
    if (!jsonData) return;
    console.log("Json data: ", jsonData);
  }, [jsonData]);

  return <div>{jsonData?.analysis}</div>;
}
