import { useNavigate } from "react-router-dom";
import React from "react";
import { ClipLoader } from "react-spinners";

import { useGlobalStateVariables } from "../state/globalVariablesState";
import DropFile from "../components/dropFile";
import useRequests from "../hooks/useRequests";
import useToasts from "../hooks/useToasts";
import { Button } from "@nextui-org/react";
import { readFileContent } from "../utils/functions";
import { OCRAnalysisResponse } from "../utils/types";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const purpureColor = "#36d7b7";

export default function Index() {
  const { fileContent, setAnalysisResult, setFileContent } =
    useGlobalStateVariables();
  const { getToastError } = useToasts();
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

    setFileContent(null);
  }, [fileContent]);

  React.useEffect(() => {
    if (!error) return;

    console.error("Error sending request: ", error);
    getToastError();
  }, [error]);

  React.useEffect(() => {
    if (!data) return;

    setAnalysisResult(data as OCRAnalysisResponse);

    navigate("/analysis");
  }, [data]);

  async function loadCustomExample() {
    const filePath = new URL("../assets/cv-example.png", import.meta.url).href;

    let content = "";

    await fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("image/png")) {
          throw new Error(`Expected image/png but received ${contentType}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const file = new File([blob], "cv-example.png", { type: blob.type });
        console.log("file: ", file.type); // Debe ser image/png
        return readFileContent(file);
      })
      .then((fileContent) => {
        content = fileContent;
      })
      .catch((error) => {
        console.error("Error loading file:", error);
      });

    setFileContent({ base64: content, type: "image/png" });
  }

  return (
    <div className='h-[87vh]'>
      <div className='h-full flex flex-col justify-center items-center'>
        {loading ? (
          <ClipLoader color={purpureColor} />
        ) : (
          <>
            <DropFile />
            <div className=''>
              <p className='text-center py-4'>OR</p>
              <Button
                size='lg'
                color='secondary'
                variant='ghost'
                onClick={loadCustomExample}>
                Try custom example
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
