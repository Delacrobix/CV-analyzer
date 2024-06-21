import React from "react";
import { Progress } from "@nextui-org/progress";

import { OCRAnalysisResponse, CvAnalysisResponse } from "../utils/types";
import DashboardGrid from "./dashboardGrid";
import useToasts from "../hooks/useToasts";

interface DashboardProps {
  cvAnalysisDataString: OCRAnalysisResponse | null;
}

export default function Dashboard({
  cvAnalysisDataString,
}: Readonly<DashboardProps>) {
  const { getToastError } = useToasts();

  const [jsonData, setJsonData] = React.useState<CvAnalysisResponse | null>(
    null
  );

  React.useEffect(() => {
    if (!cvAnalysisDataString) return;

    try {
      const parsedData = JSON.parse(cvAnalysisDataString.aiResponse);

      setJsonData(parsedData as CvAnalysisResponse);
    } catch (e) {
      getToastError("Error parsing data");
      console.error("Error parsing data: ", e);
    }
  }, [cvAnalysisDataString]);

  return (
    <div className=' my-8 space-y-8'>
      <p className='text-center font-bold text-2xl'>
        Here is the resume and analysis about your CV
      </p>
      <div className='flex flex-col justify-center items-center mt-6'>
        <h3 className='text-center font-mono font-bold'>CV SCORE</h3>
        <div className='w-full flex justify-center px-4 sm:px-0'>
          <ProgressBar barValue={jsonData?.cvScore} />
        </div>
      </div>
      <div className=''>
        <DashboardGrid cvAnalysisData={jsonData} />
      </div>
    </div>
  );
}

interface ProgressBarProps {
  barValue: number | undefined;
}

function ProgressBar({ barValue }: Readonly<ProgressBarProps>) {
  return (
    barValue !== 0 && (
      <Progress
        aria-label='Downloading...'
        size='md'
        value={barValue}
        color='success'
        showValueLabel={true}
        className='max-w-md'
      />
    )
  );
}
