'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'

import { useDropzone } from '@uploadthing/react'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'
// What is Dispatch<SetStateAction<File[]>>?
// This long thing just tells TypeScript:

// "This is the type of the function that updates a state variable, specifically a state variable that holds an array of files (File[])."

// 💡 Simple Breakdown:
// 1. useState in React:
// You normally write:

// tsx
// Copy
// Edit
// const [files, setFiles] = useState<File[]>([]);
// files is the current value (array of files).

// setFiles is the function you use to update that value.

// 2. What is the type of setFiles?
// It’s automatically typed by React as:

// tsx
// Copy
// Edit
// Dispatch<SetStateAction<File[]>>
// This is just a fancy way of saying:

// “This is a function that can be used to update the files array.”


type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
      onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
  })

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  )
}