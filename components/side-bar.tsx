/**
 * v0 by Vercel.
 * @see https://v0.dev/t/A3JiW5KmffS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { useState } from "react";

export default function SideBar() {

  const [isUploading, setIsUploading] = useState(false);
  const [uploadingFileName, setUploadingFileName] = useState('' as string | null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const files = event.target.files
    if (!files) return

    setIsUploading(true);

    const formData = new FormData();

    // Loop through the files and append them to formData
    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i]); // The key 'files' can be array-like to handle multiple files
    }

    const config = {
      onUploadProgress: (progressEvent: any) => {
        const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        console.log(`Upload progress: ${percentage}%`);
      }
    };

    console.log("Files uploaded")
    setIsUploading(false);
  }

  const handleUploadProgress = (event: { loaded: number; total: number; }) => {
    const progress = Math.round((event.loaded * 100) / event.total);
    setUploadProgress(progress);
  };

  return (
    <div className="right-0 top-0 h-screen w-90 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col justify-between p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Files</h2>
          {/* <Button size="sm" variant="ghost">
            <SettingsIcon className="h-4 w-4" />
          </Button> */}
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag and drop files here or click the button below to upload.
          </p>
          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    className="sr-only"
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    onChange={handleUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Your Uploads</span>
          <Button size="sm" variant="link">
            Select all
          </Button>
        </div>


        <div className="mt-4 space-y-2">
          {!isUploading && (
            <div className="flex items-center space-x-2 rounded-md p-2 bg-gray-100 dark:bg-gray-800">
              <UploadCloudIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Uploading {uploadingFileName}...</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{uploadProgress}%</span>
            </div>
          )
          }
          <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <FileIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">image.jpg</span>
          </div>
          <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <FileIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">document.pdf</span>
          </div>
        </div>
      </div>
    </div>
  )
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


function SettingsIcon(props: any) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
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