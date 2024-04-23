import React from "react";
import { ClipLoader } from "react-spinners";

import { useGlobalStateVariables } from "../state/globalVariablesState";
import DropFile from "../components/dropFile";
import useRequests from "../hooks/useRequests";
import useErrorToasts from "../hooks/useErrorToasts";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const purpureColor = "#36d7b7";

export default function Index() {
  const { fileContent } = useGlobalStateVariables();
  const { getToastError } = useErrorToasts();
  const { loading, sendRequest, error, data } = useRequests();

  React.useEffect(() => {
    (async () => {
      await sendRequest({
        method: "POST",
        url: `${VITE_SERVER_URL}/analyzer/ocr`,
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

    console.log("Data received: ", data);
  }, [data]);

  return (
    <div className='h-full'>
      <div className='h-full flex flex-col justify-center items-center'>
        {loading ? <ClipLoader color={purpureColor} /> : <DropFile />}
      </div>
    </div>
  );
}
