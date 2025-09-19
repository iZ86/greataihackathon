import { CloudUpload } from "lucide-react";
import { useState } from "react";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);

  function submitFile() {
    if (!file) return;

    alert("File uploaded: " + file.name);
  }

  return (
    <form onSubmit={submitFile} className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 md:p-16 text-center bg-gray-50 dark:bg-gray-900/20">
      <CloudUpload size={80} className="text-blue-400" />
      <p className="text-lg font-semibold text-gray-900 dark:text-white">
        Drag and drop or select files
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
        Supported formats: PDF, DOCX, TXT
      </p>

      <input
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border border-dashed border-gray-400 mt-1 block rounded-md w-1/2 text-sm text-white font-bold file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-400 cursor-pointer"
        id="attachment"
        name="attachment"
        type="file"
      />

      <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
        Upload
      </button>
    </form>
  );
}
