import { useNavigate } from "react-router-dom";
import React from "react";
import { ClipLoader } from "react-spinners";

import { useGlobalStateVariables } from "../state/globalVariablesState";
import DropFile from "../components/dropFile";
import useRequests from "../hooks/useRequests";
import useErrorToasts from "../hooks/useErrorToasts";
import { Button } from "@nextui-org/react";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const purpureColor = "#36d7b7";

export default function Index() {
  const { fileContent, setAnalysisResult } = useGlobalStateVariables();
  const { getToastError } = useErrorToasts();
  const { loading, sendRequest, error, data } = useRequests();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!fileContent) return;

    (async () => {
      await sendRequest({
        method: "POST",
        url: `${VITE_SERVER_URL}/analyzer/cv-analysis`,
        data: fileContent,
        headers: {
          "Content-Type": "application/json",
          "api-key": VITE_API_KEY,
        },
      });
    })();
  }, [fileContent]);

  React.useEffect(() => {
    if (!error) return;

    console.error("Error sending request: ", error);
    getToastError();
  }, [error]);

  React.useEffect(() => {
    if (!data) return;

    setAnalysisResult(data as string);

    navigate("/analysis");
  }, [data]);

  return (
    <div className='h-full'>
      <div className='h-full flex flex-col justify-center items-center'>
        {loading ? (
          <ClipLoader color={purpureColor} />
        ) : (
          <>
            <DropFile />
            <div className=''>
              <p className='text-center py-4'>OR</p>
              <Button size='lg' color='secondary' variant='ghost'>
                Try custom example
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
