"use client";

import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import UploadFileModal from "@/components/UploadFileModal";

export default function Documents() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />
      <Sidebar page="documents" />

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

            {/* Documents table */}
            <div className="mt-12">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Documents
                </h3>

                <UploadFileModal />
              </div>

              <div className="relative w-full mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-700 py-2 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200/50 dark:border-gray-700/50 h-[400px]">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-700 dark:text-gray-400 uppercase">
                    <tr>
                      <th className="px-6 py-3" scope="col">
                        Document Name
                      </th>
                      <th className="px-6 py-3" scope="col">
                        Uploaded Date
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
                      <td className="px-6 py-4 lg:justify-evenly lg:flex space-x-4">
                        <a
                          className="font-medium text-primary hover:underline"
                          href="#"
                        >
                          View
                        </a>
                        <a
                          className="font-medium text-primary hover:underline"
                          href="#"
                        >
                          Download
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
                      <td className="px-6 py-4 lg:justify-evenly lg:flex space-x-4">
                        <a
                          className="font-medium text-primary hover:underline"
                          href="#"
                        >
                          View
                        </a>
                        <a
                          className="font-medium text-primary hover:underline"
                          href="#"
                        >
                          Download
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
                      <td className="px-6 py-4 lg:justify-evenly lg:flex space-x-4">
                        <a
                          className="font-medium text-primary hover:underline"
                          href="#"
                        >
                          View
                        </a>
                        <a
                          className="font-medium text-primary hover:underline"
                          href="#"
                        >
                          Download
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
