"use client";

import { useState, useEffect } from "react";
import { list, getUrl, remove } from "aws-amplify/storage";
import { Search, X, Trash2, Eye, RefreshCcw } from "lucide-react";
import UploadFileModal from "@/components/UploadFileModal";

interface Document {
  key: string;
  name: string;
  lastModified: Date;
  size: number;
}

export default function DocumentsTable() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  async function getDocuments() {
    try {
      setLoading(true);
      // List all files in the medical-query-bucket
      const result = await list({
        path: "medical-records/",
      });

      // Filter for PDF files and map to Document objects
      const pdfDocuments = result.items
        .filter((item) => item.path?.endsWith(".pdf"))
        .map((item) => ({
          key: item.path!,
          name: item.path!.split("/").pop() || item.path!,
          lastModified: item.lastModified
            ? new Date(item.lastModified)
            : new Date(),
          size: item.size || 0,
        }));

      setDocuments(pdfDocuments);
      setFilteredDocuments(pdfDocuments);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  }

  async function openDocumentInNewTab(key: string) {
    try {
      // Get a pre-signed URL for the document
      const { url } = await getUrl({
        path: key,
        options: {
          expiresIn: 3600, // URL expires in 1 hour
        },
      });

      // Open the PDF in a new tab
      window.open(url.toString(), "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening document:", error);
      alert("Failed to open document. Please try again.");
    }
  }

  async function deleteDocument(key: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      setDeleting(key);
      // Delete the document from storage
      await remove({
        path: key,
      });

      // Remove the document from the local state
      setDocuments((prev) => prev.filter((doc) => doc.key !== key));
      setFilteredDocuments((prev) => prev.filter((doc) => doc.key !== key));
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document. Please try again.");
    } finally {
      setDeleting(null);
    }
  }

  // Filter documents based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredDocuments(documents);
    } else {
      const filtered = documents.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDocuments(filtered);
    }
  }, [searchTerm, documents]);

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Load documents on component mount
  useEffect(() => {
    getDocuments();
  }, []);

  if (loading) {
    return (
      <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200/50 dark:border-gray-700/50 h-[400px] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">
          Loading documents...
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="justify-end flex">
          <div className="mt-4 flex justify-end gap-6">
            {/* Upload button */}
            <UploadFileModal />
            {/* Refresh button */}
            <button
              onClick={getDocuments}
              className="px-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
            >
              <RefreshCcw className="" size={16} />
            </button>
          </div>
        </div>
        {/* Search Bar */}
        <div className="mt-4 mb-4 flex items-center gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search documents by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-700 py-2 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {filteredDocuments.length} of {documents.length} documents
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200/50 dark:border-gray-700/50 max-h-[400px]">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-700 dark:text-gray-400 uppercase sticky top-0">
            <tr>
              <th className="px-6 py-3" scope="col">
                Document Name
              </th>
              <th className="px-6 py-3" scope="col">
                Uploaded Date
              </th>
              <th className="px-6 py-3" scope="col">
                Size
              </th>
              <th className="px-6 py-3" scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  {searchTerm ? (
                    <>No documents found matching &quot;{searchTerm}&quot;</>
                  ) : (
                    <>No documents found. Upload a PDF to get started.</>
                  )}
                </td>
              </tr>
            ) : (
              filteredDocuments.map((document) => (
                <tr
                  key={document.key}
                  className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                >
                  <th
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-xs truncate"
                    scope="row"
                    title={document.name}
                  >
                    {document.name}
                  </th>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {document.lastModified.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {(document.size / 1024).toFixed(1)} KB
                  </td>
                  <td className="px-6 py-4 flex items-center space-x-10">
                    <button
                      onClick={() => openDocumentInNewTab(document.key)}
                      className="p-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
                      title="View document"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        deleteDocument(document.key, document.name)
                      }
                      disabled={deleting === document.key}
                      className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      title="Delete document"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
