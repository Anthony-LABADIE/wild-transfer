import { useMutation, useQuery } from '@apollo/client'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'

import FileTable from '../../components/FileTable'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import CommentForm from '../../components/commentForm/CommentForm'
import FilesSkeleton from '../../components/skeleton/FilesSkeleton'
import { CREATE_COMMENT_SHARE_URL } from '../../graphql/mutations/createCommentShareUrl.mutation'
import { GET_COMMENT_LIST } from '../../graphql/queries/GetCommentList.queries'
import { GETSHAREDURLBYID } from '../../graphql/queries/GetSharedUrlByIdWithRelations.queries'
import useAuth from '../../hooks/useAuth'
import { Comment } from '../../interfaces/interfaces'
import Layout from '../../layout/Layout'
import { formatTtile } from '../../lib/utils/common'
import Lottie from '../../ui/lottie/Lottie'

const FileShareUrlDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const { data: dataComment } = useQuery(GET_COMMENT_LIST)
  const [createComment] = useMutation(CREATE_COMMENT_SHARE_URL)
  const [deleteShareUrl] = useMutation(CREATE_COMMENT_SHARE_URL)
  const VITE_URI = import.meta.env['VITE_URI'] as string

  const { error, loading, data } = useQuery(GETSHAREDURLBYID, {
    variables: { sharedUrlByIdId: id },
  })
  const navigate = useNavigate()
  const IdUrl = id
  const [formData, setFormData] = useState({
    message: '',
  })

  const [activityItems, setActivityItems] = useState([])

  useEffect(() => {
    if (data) {
      setActivityItems(data.SharedUrlById.files)
    }
  }, [data])

  const handleEdit = (value: string, id: string, title: string) => {
    if (value === 'Modifier') {
      navigate(`/share-url/${id}`)
    } else if (value === 'Supprimer') {
      if (window.confirm('Voulez-vous vraiment supprimer ce fichier ?')) {
        deleteShareUrl({
          variables: { deleteShareUrlId: id },
        })
          .then((response) => {
            const { errors } = response
            if (errors && errors.length > 0) {
              // Afficher le premier message d'erreur du tableau
              window.alert(`Erreur lors de la suppression du fichier`)
            } else {
              // Gérer le succès de l'opération ici, par exemple, afficher un message de succès
              window.alert('Fichier supprimé avec succès')
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
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await createComment({
        variables: {
          commentToCreate: {
            authorId: user?.id,
            content: formData.message,
            sharedUrlId: id,
          },
        },
      })
      window.location.reload()
    } catch (error) {
      console.error('Mutation error:', error)
    }
  }
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      message: e.target.value,
    })
  }

  const filteredComments: Comment[] = (dataComment?.commentsList || []).filter(
    (comment: Comment) =>
      comment.sharedUrl !== null && comment.sharedUrl.id === id,
  )

  if (loading) return <FilesSkeleton />
  if (error) return <PageNotFound />

  return (
    <>
      <Layout>
        <div className="pt-11">
          <h2 className="px-4 pb-4 text-2xl font-semibold leading-7 text-[#303535] sm:px-6 lg:px-2">
            Mes liens partagés / {formatTtile(data?.SharedUrlById.title)}
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
            <>
              <FileTable
                data={activityItems}
                onEdit={handleEdit}
                link={(id) => `/share-url/${IdUrl}/${id}`}
                getUserName={(author) => `${author.author.username}`}
                partager={false}
              />
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 p-4 mt-10">
                <CommentForm
                  filteredComments={filteredComments}
                  handleChangeComment={handleChangeComment}
                  handleFormSubmit={handleFormSubmit}
                />
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  )
}

export default FileShareUrlDetail
