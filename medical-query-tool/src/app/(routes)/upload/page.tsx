"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { CloudUpload } from "lucide-react";

export default function Chat() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />
      <Sidebar page="upload" />

      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-4xl">
            {/* Upload area */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Upload your Medical Documents
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Securely upload and store your medical records in one place.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 md:p-16 text-center bg-gray-50 dark:bg-gray-900/20">
              <CloudUpload size={80} className="text-blue-400" />
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Drag and drop or select files
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
                Supported formats: PDF, DOCX, TXT
              </p>

              <input
                onChange={(e) => e.target.files?.[0] || null}
                className="border border-dashed border-gray-400 mt-1 block rounded-md w-1/2 text-sm text-white font-bold file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-400 cursor-pointer"
                id="attachment"
                name="attachment"
                type="file"
              />

              <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                Upload
              </button>
            </div>

            {/* Documents table */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                My Documents
              </h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-700 dark:text-gray-400 uppercase">
                    <tr>
                      <th className="px-6 py-3" scope="col">
                        Document Name
                      </th>
                      <th className="px-6 py-3" scope="col">
                        Uploaded Date
                      </th>
                      <th className="px-6 py-3" scope="col">
                        Status
                      </th>
                      <th className="px-6 py-3" scope="col">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <th
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        scope="row"
                      >
                        Medical Report 1
                      </th>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                        2024-01-15
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                          <span className="w-2 h-2 mr-1.5 bg-green-500 rounded-full"></span>
                          Processed
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          className="font-medium text-primary hover:underline"
                          href="#"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <th
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        scope="row"
                      >
                        Lab Results 2
                      </th>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                        2024-02-20
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300">
                          <span className="w-2 h-2 mr-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                          Processing
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          className="font-medium text-primary hover:underline"
                          href="#"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <th
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        scope="row"
                      >
                        Prescription 3
                      </th>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                        2024-03-05
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                          <span className="w-2 h-2 mr-1.5 bg-green-500 rounded-full"></span>
                          Processed
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          className="font-medium text-primary hover:underline"
                          href="#"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
