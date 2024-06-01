import React from "react";
import { FileData } from "../utils/types";

interface GlobalStateChildrenType {
  children: React.ReactNode;
}

interface GlobalStateType {
  fileContent: FileData;
  setFileContent: React.Dispatch<React.SetStateAction<FileData | null>>;
  analysisResult: string;
  setAnalysisResult: React.Dispatch<React.SetStateAction<string | null>>;
}

export const GlobalStateContext = React.createContext<GlobalStateType | null>(
  null
);

export function GlobalStateProvider({
  children,
}: Readonly<GlobalStateChildrenType>) {
  const [fileContent, setFileContent] = React.useState<FileData | null>(null);
  const [analysisResult, setAnalysisResult] = React.useState<string | null>(
    null
  );

  const globalState = React.useMemo(
    () =>
      ({
        fileContent,
        setFileContent,
        analysisResult,
        setAnalysisResult,
      } as GlobalStateType),
    [fileContent, setFileContent, analysisResult, setAnalysisResult]
  );

  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalStateVariables() {
  return React.useContext(GlobalStateContext) as GlobalStateType;
}
