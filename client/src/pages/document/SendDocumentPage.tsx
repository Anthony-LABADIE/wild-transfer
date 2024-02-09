import React, { DragEvent, useRef, useState } from 'react'

import Layout from '../../layout/Layout'
import Button from '../../ui/button/Button'
import Title from '../../ui/title/Title'

const SendDocument: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    // logique d'upload
    // delay simulation for upload
    setTimeout(() => {
      setUploading(false)
      setFileUploaded(true)
    }, 1000)
  }

  const handleSend = () => {
    setShowModal(true)
  }

  const handleModalSubmit = async () => {
    // logique send ici
    setShowModal(false)
    setEmail('')
    setMessage('')
    setFile(null)
    setFileUploaded(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile || null) // add null check here
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.items) {
      const fileItem = e.dataTransfer.items[0]
      if (fileItem && fileItem.kind === 'file') {
        const droppedFile = fileItem.getAsFile()
        setFile(droppedFile)
      }
    }
  }

  return (
    <Layout>
      <div className="mt-20 flex flex-col items-center">
        <div
          className="border p-4 rounded-md shadow-md mb-4"
          style={{ width: '300px' }}
        >
          <Title className="mb-4 text-center" />
          {/* Display file name */}
          {file && (
            <p className="mb-4 text-center text-gray-500">{file.name}</p>
          )}{' '}
          {/* Added file name display */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-400 h-24 flex items-center justify-center cursor-pointer mb-4 relative"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full h-full opacity-0 cursor-pointer absolute top-0 left-0"
            />
            {file ? file.name : 'Drop/Select file here'}{' '}
            {/* Conditional display text */}
          </div>
          {!fileUploaded ? (
            <Button
              className="text-xl w-full"
              onClick={handleUpload}
              disabled={uploading || !file}
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          ) : (
            <Button className="text-xl w-full" onClick={handleSend}>
              Send Document
            </Button>
          )}
        </div>
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '300px',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <h2 style={{ marginBottom: '10px' }}>Send Document</h2>
              <label htmlFor="email" style={{ marginBottom: '5px' }}>
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  marginBottom: '10px',
                }}
              />
              <label htmlFor="message" style={{ marginBottom: '5px' }}>
                Message:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  minHeight: '80px',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {' '}
                {/* Added to separate buttons */}
                <Button onClick={handleModalSubmit}>Send</Button>
                <Button onClick={() => setShowModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default SendDocument
