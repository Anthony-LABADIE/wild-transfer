import { useMutation } from '@apollo/client'
import React, { DragEvent, useRef, useState } from 'react'

import { CREATE_FILE } from '../../graphql/mutations/file.mutation'
import useAuth from '../../hooks/useAuth'
import Button from '../../ui/button/Button'
import { SwitchUi } from '../../ui/switch/Switch'
import Title from '../../ui/title/Title'
import FormsUploadRecipient from './FormsUploadRecipient'

export interface dataResult {
  CreateFile: {
    author: {
      username: string
    }
    description: string
    id: string
    createdAt: string
    duration: string
    format: string
    isPublic: string
    title: string
    url: string
  }
}

export interface UploadProps {
  setShowDocument: (value: boolean) => void
}

const Upload = ({ setShowDocument }: UploadProps) => {
  const [createFile] = useMutation(CREATE_FILE, { fetchPolicy: 'no-cache' })
  const { user } = useAuth()
  const [files, setFiles] = useState<File[]>([])
  const [showModal, setShowModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dataResult, setDataResult] = useState<dataResult[]>()
  const [fileIdArray, setFileIdArray] = useState<string[]>([]) // Nouveau tableau pour stocker les fileId
  const [switchValue, setSwitchValue] = useState<boolean>(false)
  const VITE_URI = import.meta.env['VITE_URI'] as string
  const handleSend = async () => {
    const formdata = new FormData()
    console.log(files, '🔵')

    for (const file of files) {
      formdata.append(`files`, file as Blob)
      formdata.append(`title[]`, file?.name as string)
      formdata.append(`description[]`, file?.name as string)
      formdata.append(`isPublic[]`, switchValue ? 'true' : 'false')
      formdata.append(`author[]`, user?.username as string)
    }

    try {
      const response = await fetch(`${VITE_URI}/uploads/files`, {
        method: 'POST',
        body: formdata,
      })

      const result = await response.json()
      setDataResult(result)

      if (result) {
        for (const file of result) {
          try {
            const { data: dataCreateFile } = await createFile({
              variables: { fileToCreate: file },
            })
            const fileId = dataCreateFile?.CreateFile.id

            if (fileId) {
              fileIdArray.push(fileId)
              setFileIdArray(fileIdArray)
            }

            setDataResult(dataCreateFile)
          } catch (error) {
            console.error('CREATE_FILE Error:', error)
          }
        }

        setShowModal(true)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) return
    setTimeout(() => {}, 1000)
    handleSend()
    closeModal()
  }
  const handleUploadRecipient = () => {
    if (files.length === 0) return
    setTimeout(() => {}, 1000)
    handleSend()
  }

  const handleModalSubmit = async () => {
    setShowModal(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      setFiles([...files, ...selectedFiles])
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.items) {
      const fileItem = e.dataTransfer.items[0]
      if (fileItem && fileItem.kind === 'file') {
        const droppedFile = fileItem.getAsFile()
        if (droppedFile) {
          setFiles([...files, droppedFile])
        }
      }
    }
  }

  const closeModal = () => {
    setShowDocument(false)
  }

  const handleSwitch = () => {
    setSwitchValue(!switchValue)
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-black flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className={
          showModal === true
            ? 'hidden'
            : 'sm:max-w-lg w-full p-20 gap-6 bg-white rounded-xl z-10'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <Title className="mb-10 text-center" />
        {files.length > 0 && (
          <div>
            <p>Selected files:</p>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-400 h-24 flex items-center justify-center cursor-pointer mb-10 relative"
        >
          <input
            type="file"
            multiple
            name="files"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="w-full h-full opacity-0 cursor-pointer absolute top-0 left-0"
          />
          {files.length > 0 ? 'Files selected' : 'Drop/Select files here'}
        </div>
        <div className="flex flex-col gap-5 mb-7">
          <p>Documents public ?</p>
          <SwitchUi enabled={switchValue} setEnabled={handleSwitch} />
        </div>
        <div className="flex flex-col gap-2">
          <Button className="text-xl w-full" onClick={handleUpload}>
            Télécharger
          </Button>
          <Button className="text-xl w-full" onClick={handleUploadRecipient}>
            Choisir le destinataire
          </Button>
        </div>
      </div>
      {showModal && (
        <FormsUploadRecipient
          setShowDocument={setShowDocument}
          handleModalSubmit={handleModalSubmit}
          closeModal={closeModal}
          dataResult={dataResult}
          fileIdArray={fileIdArray}
        />
      )}
    </div>
  )
}

export default Upload
