/**
 * v0 by Vercel.
 * @see https://v0.dev/t/A3JiW5KmffS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { DeleteFileModal } from "./delete-file-modal";

export default function SideBar() {

  const [isUploading, setIsUploading] = useState(false);
  const [fileNames, setFileNames] = useState([] as string[]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState('' as string | null);

  // Fetch the files from the server
  const fetchFileNames = async () => {
    const response = await fetch('/api/files');
    const data = await response.json();
    setFileNames(data);
  }

  useEffect(() => {
    fetchFileNames()
  }
    , [])

  const truncateFileName = (fileName: string) => {
    if (fileName.length > 30) {
      return fileName.slice(0, 30) + '...';
    }
    return fileName;
  }

  const createDeleteFileClickHandler = (fileName: string) => {
    return async () => {
      setFileToDelete(fileName);
      setIsDeleteModalOpen(true);
    };
  }

  const deleteFile = async () => {
    if (!fileToDelete) return;
    const response = await fetch('/api/deletefile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: fileToDelete }),
    });

    if (response.ok) {
      fetchFileNames();
      setIsDeleteModalOpen(false);
    }
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true);
    const formData = new FormData();
    // Loop through the files and append them to formData
    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i]); // The key 'files' can be array-like to handle multiple files
    }

    // Call the API to upload the files
    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Files uploaded")
          fetchFileNames();
        }
      })
      .catch((error) => {
        console.error('Failed to upload the file:', error);
      })
      .finally(() => {
        setIsUploading(false);
      });
  }

  return (
    <div className="flex flex-col h-screen w-90 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="flex flex-col justify-between p-4 space-y-4 overflow-hidden">
        {/* Header and upload section */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Files</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag and drop files here or click the button below to upload.
          </p>
          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input className="sr-only" id="file-upload" name="file-upload" type="file" multiple onChange={handleUpload} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Your Uploads</span>
          {/* <Button size="sm" variant="link">
            Select all
          </Button> */}
        </div>

        {/* File listing section */}
        <div className="flex-grow overflow-auto">
          {isUploading && (
            <div className="flex items-center space-x-2 rounded-md p-2 bg-gray-100 dark:bg-gray-800">
              <UploadCloudIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Uploading file(s)...</span>
            </div>
          )}
          {fileNames.map((fileName) => (
            <div key={fileName} className="flex justify-between items-center space-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="flex">
                <FileIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{truncateFileName(fileName)}</span>
              </div>
              <Button className="ml-auto" size="sm" variant="ghost" onClick={createDeleteFileClickHandler(fileName)}>
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
      {isDeleteModalOpen && fileToDelete && <DeleteFileModal onClose={() => setIsDeleteModalOpen(false)} onDelete={deleteFile} />}
    </div>
  );
}

function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}


function UploadCloudIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  )
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}