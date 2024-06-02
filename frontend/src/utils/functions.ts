export function readFileContent(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      const base64Content = base64String.replace(/^data:[^;]+;base64,/, "");
      resolve(base64Content);
    };

    reader.onerror = () => {
      reject(new Error("Error reading file content!"));
    };

    reader.readAsDataURL(file);
  });
}
