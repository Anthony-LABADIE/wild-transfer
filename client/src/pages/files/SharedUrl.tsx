import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import FileTable from '../../components/FileTable'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import FilesSkeleton from '../../components/skeleton/FilesSkeleton'
import { DELETE_SHARED_URL } from '../../graphql/mutations/deleteSharedUrl.mutation'
import { SHARED_ALL_URL_BY_ID } from '../../graphql/queries/ShareAllUrlsListByAuthorId.queries'
import useAuth from '../../hooks/useAuth'
import Layout from '../../layout/Layout'
import Lottie from '../../ui/lottie/Lottie'

interface SharedUrl {
  title: string
  id: string
  author: {
    username: string
    id: string
  }
  createdAt: string
  updatedAt: string
}
const SharedUrl = () => {
  const { user } = useAuth()
  const { error, loading, data } = useQuery(SHARED_ALL_URL_BY_ID, {
    variables: { userId: user?.id },
  })
  const [deleteSharedUrl] = useMutation(DELETE_SHARED_URL)
  const [activityItems, setActivityItems] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if (data) {
      setActivityItems(data.SharedUrlByUserId)
    }
  }, [data])

  const handleEdit = (value: string, id: string) => {
    if (value === 'Modifier') {
      navigate(`/share-url/${id}`)
    } else if (value === 'Supprimer') {
      if (window.confirm('Voulez-vous vraiment supprimer ce fichier ?')) {
        deleteSharedUrl({
          variables: { deleteSharedUrlId: id },
        })
          .then((response) => {
            if (response.data) {
              setActivityItems(
                activityItems.filter((item: SharedUrl) => item.id !== id),
              )
              window.alert('Fichier supprimé avec succès')
            }
          })
          .catch(() => {
            // Gérer les erreurs inattendues ici
            window.alert(`Erreur lors de la suppression du fichier`)
          })
      }
    }
  }

  if (loading) return <FilesSkeleton />
  if (error) return <PageNotFound />

  return (
    <Layout>
      <div className="pt-11">
        <h2 className="px-4 pb-4 text-2xl font-semibold leading-7 text-[#303535] sm:px-6 lg:px-2">
          Mes liens partagés
        </h2>
        {activityItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-4 px-4 border-dotted border-[#939393] border-2 rounded-lg p-8 bg-gray-100">
            <p className="text-[#303535] mt-4 text-lg font-semibold">
              Aucun lien créé
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
            link={(id) => `/share-url/${id}`}
            getUserName={(author) => `${author.author.username}`}
            logo="url"
            partager={false}
          />
        )}
      </div>
    </Layout>
  )
}

export default SharedUrl
