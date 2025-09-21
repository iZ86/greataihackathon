"use client";

import { uploadData } from "@aws-amplify/storage/internals";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CloudUpload, Upload, Loader2 } from "lucide-react";
import { Fragment, useState } from "react";
export default function UploadFileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [emptyInput, setEmptyInput] = useState(false);
  const [uploading, setUploading] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setEmptyInput(false);
    setFile(null);
    setUploading(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function submitFile(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      setEmptyInput(true);
      return;
    }

    setUploading(true);

    try {
      const result = await uploadData({
        path: `medical-records/${Date.now()}-${file.name}`,
        data: file,
        options: {
          contentType: file.type,
        },
      });

      const ingestResponse = await fetch("/api/ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentKey: `medical-records/${Date.now()}-${file.name}`,
        }),
      });

      closeModal();

      if (!ingestResponse.ok) {
        throw new Error("Failed to trigger ingestion");
      }

      const ingestResult = await ingestResponse.json();
      console.log("Ingestion started:", ingestResult);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity cursor-pointer justify-center flex items-center"
      >
        Upload
        <Upload className="inline-block ml-2" size={16} />
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Upload a Document
                  </DialogTitle>

                  <form onSubmit={submitFile} className="mt-4">
                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 text-center bg-gray-50 dark:bg-gray-900/20">
                      <CloudUpload size={60} className="text-blue-400 mb-2" />
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Drag and drop or select files
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
                        Supported formats: PDF only.
                      </p>
                      <input
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="border mt-2 block rounded-md w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-400 cursor-pointer"
                        id="attachment"
                        name="attachment"
                        type="file"
                        accept="application/pdf"
                      />

                      {emptyInput && (
                        <p className="text-sm text-red-500 mt-2">
                          Please select a file to upload.
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        className={`px-4 py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 ${uploading ? "cursor-not-allowed" : "cursor-pointer dark:active:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 "} font-semibold`}
                        disabled={uploading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`px-4 py-2 text-sm rounded-md text-white font-semibold ${uploading ? "cursor-not-allowed bg-gray-400" : "cursor-pointer active:bg-blue-700 bg-blue-500 hover:bg-blue-600"}`}
                        disabled={uploading}
                      >
                        {uploading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={16} />
                            Uploading...
                          </div>
                        ) : (
                          <div className="flex items-center">Upload</div>
                        )}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
