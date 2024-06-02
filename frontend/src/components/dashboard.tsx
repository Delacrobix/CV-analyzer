import React from "react";
import { CvAnalysisResponse, OCRAnalysisResponse } from "../utils/types";

interface DashboardProps {
  data: OCRAnalysisResponse | null;
}

export default function Dashboard({ data }: Readonly<DashboardProps>) {
  const [jsonData, setJsonData] = React.useState<CvAnalysisResponse | null>(
    null
  );

  React.useEffect(() => {
    if (!data) return;

    try {
      const parsedData = JSON.parse(data.aiResponse);

      setJsonData(parsedData as CvAnalysisResponse);
    } catch (e) {
      console.error("Error parsing data: ", e);
    }
  }, [data]);

  React.useEffect(() => {
    if (!jsonData) return;
    console.log("Json data: ", jsonData);
  }, [jsonData]);

  return <div>{jsonData?.analysis}</div>;
}
