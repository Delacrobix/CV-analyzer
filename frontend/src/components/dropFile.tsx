import React from "react";
import { useDropzone } from "react-dropzone";

import useErrorToasts from "../hooks/useErrorToasts";

export default function DropFile() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { getToastWarning, getToastError } = useErrorToasts();

  React.useEffect(() => {
    if (acceptedFiles.length === 0) return;

    if (acceptedFiles.length > 1) {
      getToastWarning("Please select only one file!");
      return;
    }

    const file = acceptedFiles[0];

    if (!isValidSize(file)) return;
    if (!isValidType(file)) return;

    // (async () => {
    //   try {
    //     const fileContent = await readFileContent(file);
    //   } catch (e) {
    //     console.error("Error reading file content: ", e);
    //     getToastError();
    //   }
    // })();
  }, [acceptedFiles]);

  function isValidSize(file: File) {
    if (file.size > 1000000) {
      getToastWarning(
        "The file is too big! Please select a file less than 1MB."
      );

      return false;
    }

    return true;
  }

  function readFileContent(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = handleFileLoad;
      reader.onerror = handleError;
      reader.readAsText(file);

      function handleFileLoad(event: ProgressEvent<FileReader>) {
        const contents = event?.target?.result;
        resolve(contents);
      }

      function handleError(error: ProgressEvent<FileReader>) {
        reject(error);
      }
    });
  }

  function isValidType(file: File) {
    const validTypes = [
      "text/css",
      "text/html",
      "application/x-tiled-tsx",
      "text/javascript",
      "application/javascript",
      "application/jsx",
      "text/jsx",
    ];

    if (!validTypes.includes(file.type)) {
      getToastWarning(
        "The file type is not supported! Please select a CSS, HTML, TSX or JSX file."
      );

      return false;
    }

    return true;
  }

  return (
    <div className='border border-dashed border-gray-400 p-10 rounded-lg w-[70%]'>
      <div
        {...getRootProps()}
        className='border border-dashed border-gray-400 py-16 px-24 rounded-lg text-center cursor-pointer '>
        <input {...getInputProps()} />
        <p className='text-gray-600'>
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <aside>
        <ul>
          <li className='pl-1 text-gray-500 text-[13px]'>
            Files must be less than 2MB and of type PDF, docx, odt or image
            (JPG, JPEG and PNG).
          </li>
        </ul>
      </aside>
    </div>
  );
}
