import { useMutation } from '@apollo/client'
import emailjs from '@emailjs/browser'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'

import { CREATE_SHARED_URL } from '../../graphql/mutations/sharedUrl.mutation'
import useAuth from '../../hooks/useAuth'
import Button from '../../ui/button/Button'
import { dataResult } from './Upload'

interface FormsUploadRecipientProps {
  handleModalSubmit: () => void
  closeModal: () => void
  dataResult: dataResult[] | undefined
  setShowDocument: (value: boolean) => void
  fileIdArray: string[]
}

interface DataEmail {
  message: string
  userEmail: string
  userEmailTo: string
  dataResultId: string
}
type FieldValues = DataEmail

const FormsUploadRecipient: React.FC<FormsUploadRecipientProps> = (props) => {
  const { handleModalSubmit, closeModal, fileIdArray } = props
  const [createSharedUrl] = useMutation(CREATE_SHARED_URL)
  const { user } = useAuth()
  const { handleSubmit, register, getValues } = useForm<FieldValues>()
  const [title, setTitle] = useState<string>('')
  const VITE_URI_CLIENT = import.meta.env['VITE_URI_CLIENT'] as string

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  // Send Email with EmailJS
  const sendEmail = async (data: DataEmail, idSharedUrl: string) => {
    const { message, userEmail, userEmailTo, dataResultId } = data

    try {
      const urlList = `${VITE_URI_CLIENT}/share-url/${idSharedUrl}`

      const templateParams = {
        message: `${message}\n\nLien de téléchargement: ${urlList}`,
        userEmail,
        userEmailTo,
        dataResultId,
      }

      await emailjs.send(
        import.meta.env['VITE_SERVICE_ID'] as string,
        import.meta.env['VITE_TEMPLATE_ID'] as string,
        templateParams,
        import.meta.env['VITE_USER_ID'] as string,
      )
    } catch (e) {
      console.log(e, 'error')
    }
    handleModalSubmit()
    closeModal()
  }

  const CreateSharedUrl = async () => {
    try {
      const userEmailTo = getValues('userEmailTo')
      const response = await createSharedUrl({
        variables: {
          sharedUrlToCreateWithFilesAndUsers: {
            title: title,
            authorId: `${user?.id}`,
            emails: [userEmailTo],
            filesIds: fileIdArray,
          },
        },
      })

      // La variable 'response' contient la réponse de la requête
      const createdUrlId = response.data.CreateSharedUrlWithFilesAndUsers.id

      // Appeler sendEmail avec les deux arguments
      await sendEmail(getValues(), createdUrlId)
    } catch (error) {
      console.error('Mutation error:', error)
    }
  }
  return (
    <div
      className="w-96 md:w-auto bg-white p-16 rounded-xl flex flex-col gap-4"
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handleSubmit(CreateSharedUrl)}>
        <h2 className="mb-2">Send Document</h2>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email:
          </label>
          <div className="mt-2">
            <input
              type="email"
              id="email"
              value={user?.email}
              className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('userEmail', {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email du destinataire:
          </label>
          <div className="mt-2">
            <input
              type="email"
              id="email"
              className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="you@example.com"
              {...register('userEmailTo', {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Entrer le nom de votre document
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="titre"
              className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Titre"
              onChange={handleTitle}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Message:
          </label>
          <div className="mt-2">
            <textarea
              className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="you@example.com"
              {...register('message', {
                required: true,
              })}
            />
          </div>
        </div>
        <div className="flex gap-6 mt-5 justify-between">
          <Button className="w-36" onClick={closeModal}>
            Cancel
          </Button>
          <Button className="w-36">Send</Button>
        </div>
      </form>
    </div>
  )
}

export default FormsUploadRecipient
