import { useMutation, useQuery } from '@apollo/client'
import emailjs from '@emailjs/browser'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FileTable from '../../components/FileTable'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import FilesSkeleton from '../../components/skeleton/FilesSkeleton'
import { DELETE_FILE } from '../../graphql/mutations/deleteFile.mutation'
import { CREATE_SHARED_URL } from '../../graphql/mutations/sharedUrl.mutation'
import { FILELISTBYAUTHORID } from '../../graphql/queries/FileByIdAuthor.queries'
import useAuth from '../../hooks/useAuth'
import Layout from '../../layout/Layout'
import Lottie from '../../ui/lottie/Lottie'

export interface IItem {
  id: string
  title: string
  description: string
  duration: string
  format: string
  createdAt: string
  updatedAt: string
  date: string
  author: {
    id: string
    username: string
    email: string
    createdAt: string
    updatedAt: string
  }
}

export interface FormData {
  title: string
  email: string
  message: string
}

const Files = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [deleteFile] = useMutation(DELETE_FILE)
  const [createSharedUrl] = useMutation(CREATE_SHARED_URL)
  const VITE_URI = import.meta.env['VITE_URI'] as string
  const VITE_URI_CLIENT = import.meta.env['VITE_URI_CLIENT'] as string

  const [formData, setFormData] = useState({
    title: '',
    email: '',
    message: '',
  })
  const { error, loading, data } = useQuery(FILELISTBYAUTHORID, {
    variables: { id: user?.id },
  })
  const [activityItems, setActivityItems] = useState([])

  useEffect(() => {
    if (data) {
      setActivityItems(data.FileListByAuthorId)
    }
  }, [data])

  if (loading) return <FilesSkeleton />
  if (error) return <PageNotFound />

  const handleEdit = (value: string, id: string, title: string) => {
    if (value === 'Modifier') {
      navigate(`/files/${id}`)
    } else if (value === 'Supprimer') {
      if (window.confirm('Voulez-vous vraiment supprimer ce fichier ?')) {
        deleteFile({
          variables: { deleteFileId: id },
        })
          .then((response) => {
            if (response.data) {
              setActivityItems(
                activityItems.filter((item: IItem) => item.id !== id),
              )
            }
          })
          .catch((error) => {
            // Gérer les erreurs inattendues ici
            console.error('Erreur lors de la suppression du fichier :', error)
            window.alert(
              'Le fichier appartient a un lien de partage, veuillez le supprimer avant de supprimer le fichier',
            )
          })
      }
    } else if (value === 'Télécharger') {
      fetch(`${VITE_URI}/download/${id}`, {
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.blob()
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `${title}`)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch((error) => {
          console.error('Erreur lors du téléchargement du fichier :', error)
        })
    }
  }

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const clickShare = async () => {
    try {
      const response = await createSharedUrl({
        variables: {
          sharedUrlToCreateWithFilesAndUsers: {
            title: formData.title,
            authorId: `${user?.id}`,
            emails: [formData.email],
            filesIds: selectedIds,
          },
        },
      })

      const createdUrlId = response.data.CreateSharedUrlWithFilesAndUsers.id

      sendEmail(formData, createdUrlId)
    } catch (error) {
      console.error('Mutation error:', error)
    }
  }

  // Send Email with EmailJS
  const sendEmail = async (formData: FormData, createdUrlId: string) => {
    const { message, email: userEmailTo } = formData

    try {
      const urlList = `${VITE_URI_CLIENT}/share-url/${createdUrlId}`

      const templateParams = {
        message: `${message}\n\nLien de téléchargement: ${urlList}`,
        userEmail: `${user?.email || ''}`,
        userEmailTo,
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
  }

  return (
    <Layout>
      <div className="pt-11">
        <h2 className="px-4 pb-4 text-2xl font-semibold leading-7 text-[#303535] sm:px-6 lg:px-2">
          Mes Fichiers
        </h2>
        {activityItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-4 px-4 border-dotted border-[#939393] border-2 rounded-lg p-8 bg-gray-100">
            <p className="text-[#303535] mt-4 text-lg font-semibold">
              Aucun fichier n'a été déposé
            </p>
            <Lottie
              src="/animationNoData.json"
              className="w-72 h-72"
              autoplay
              loop
            />
          </div>
        ) : (
          <FileTable
            data={activityItems}
            onEdit={handleEdit}
            link={(id) => `/files/${id}`}
            getUserName={(author) => `${author.author.username}`}
            logo="file"
            partager={true}
            onCheckboxChange={handleCheckboxChange}
            onShareClick={clickShare}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </Layout>
  )
}

export default Files
