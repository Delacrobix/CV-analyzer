import React from "react";
import { useDropzone } from "react-dropzone";

import { readFileContent } from "../utils/functions";
import useToasts from "../hooks/useToasts";
import { useGlobalStateVariables } from "../state/globalVariablesState";

export default function DropFile() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { getToastWarning, getToastError } = useToasts();
  const { setFileContent } = useGlobalStateVariables();

  React.useEffect(() => {
    if (acceptedFiles.length === 0) return;

    if (acceptedFiles.length > 1) {
      getToastWarning("Please select only one file!");
      return;
    }

    const file = acceptedFiles[0];

    if (!isValidSize(file)) return;
    if (!isValidType(file)) return;

    (async () => {
      try {
        const fileContent = await readFileContent(file);

        setFileContent({ base64: fileContent, type: file.type });
      } catch (e) {
        console.error("Error reading file content: ", e);
        getToastError();
      }
    })();
  }, [acceptedFiles]);

  function isValidSize(file: File) {
    if (file.size > 2000000) {
      getToastWarning(
        "The file is too big! Please select a file less than 2MB."
      );

      return false;
    }

    return true;
  }

  function isValidType(file: File) {
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    const validDocumentTypes = ["application/pdf"];

    if (
      !(
        validImageTypes.includes(file.type) ||
        validDocumentTypes.includes(file.type)
      )
    ) {
      getToastWarning(
        "The file type is not supported! Please select an image (JPEG, JPG, PNG), PDF, DOCX, or ODT file."
      );
      return false;
    }

    return true;
  }

  return (
    <div className='border border-dashed border-gray-400 p-10 rounded-lg w-[70%]'>
      <div
        {...getRootProps()}
        className='border border-dashed border-gray-400 py-16 px-2 md:px-24 rounded-lg text-center cursor-pointer '>
        <input {...getInputProps()} />
        <p className='text-gray-600'>
          Drag 'n' drop some file here, or click to select files
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
