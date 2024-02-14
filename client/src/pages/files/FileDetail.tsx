import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { CalendarDaysIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { FormEvent, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import LogoFile from '../../assets/file.png'
import LogoPDF from '../../assets/pdf.png'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import CommentForm from '../../components/commentForm/CommentForm'
import FilesSkeleton from '../../components/skeleton/FilesSkeleton'
import { CREATE_COMMENT } from '../../graphql/mutations/createComment.mutation'
import { DELETE_FILE } from '../../graphql/mutations/deleteFile.mutation'
import { FILELIST } from '../../graphql/queries/File.queries'
import { GET_COMMENT_LIST } from '../../graphql/queries/GetCommentList.queries'
import useAuth from '../../hooks/useAuth'
import { Comment } from '../../interfaces/interfaces'
import Layout from '../../layout/Layout'
import { formatDate } from '../../lib/utils/common'
import Button from '../../ui/button/Button'
import { Dialog, DialogClose } from '../../ui/dialog/Dialog'
import Lottie from '../../ui/lottie/Lottie'
import { IItem } from './Files'

export default function FileDetail() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const { error, loading, data } = useQuery(FILELIST)
  const [createComment] = useMutation(CREATE_COMMENT)
  const { data: dataComment } = useQuery(GET_COMMENT_LIST)
  const [deleteFile] = useMutation(DELETE_FILE)
  const VITE_URI = import.meta.env['VITE_URI'] as string
  const { id } = useParams() // Recover the ID from the URL
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    message: '',
  })

  if (loading) return <FilesSkeleton />
  if (error) return <PageNotFound />

  // Recover the list of files
  const activityItems = data.FileList
  // Filter the list of files to find the one with the right ID
  const dataItem = activityItems.find((item: IItem) => item.id === id)

  const handleDelete = () => {
    deleteFile({
      variables: { deleteFileId: id },
    })
    navigate('/files')
    window.location.reload()
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      message: e.target.value,
    })
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await createComment({
        variables: {
          commentToCreate: {
            authorId: user?.id,
            content: formData.message,
            fileId: id,
          },
        },
      })
      window.location.reload()
    } catch (error) {
      console.error('Mutation error:', error)
    }
  }
  // Choisissez le logo en fonction du format du fichier
  const logo = dataItem.format === 'pdf' ? LogoPDF : LogoFile

  const filteredComments: Comment[] = (dataComment?.commentsList || []).filter(
    (comment: Comment) => comment.file !== null && comment.file.id === id,
  )

  return (
    <>
      <Layout>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h2 className="px-4 pb-6 text-2xl font-semibold leading-7 text-[#303535] sm:px-6 lg:px-2">
              {dataItem.title}
            </h2>
            <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {/* Invoice summary */}
              <div className="lg:col-start-3 lg:row-end-1">
                <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                  <dl className="flex flex-wrap">
                    <div className="flex-auto pl-6 pt-6">
                      <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                        Format
                      </dd>
                    </div>
                    <div className="flex-none self-end px-6 pt-4">
                      <dt className="sr-only">Status</dt>
                      <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20">
                        {dataItem.format}
                      </dd>
                    </div>
                    <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                      <dt className="flex-none">
                        <span className="sr-only">Client</span>
                        <UserCircleIcon
                          className="h-6 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd className="text-sm font-medium leading-6 text-gray-900">
                        {dataItem.author.username}
                      </dd>
                    </div>
                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                      <dt className="flex-none">
                        <span className="sr-only">Due date</span>
                        <CalendarDaysIcon
                          className="h-6 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd className="text-sm leading-6 text-gray-500">
                        <time dateTime="2023-01-31">
                          {formatDate(dataItem.updatedAt)}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex flex-col gap-4 border-t border-gray-900/5 px-6 py-6">
                    <Link to={`${VITE_URI}/uploads/download/${dataItem.id}`}>
                      <Button className="w-[140px] h-[28px]" size="small">
                        Télécharger
                      </Button>
                    </Link>
                    <Dialog
                      description="Vous êtes sur le point de supprimer ce fichier. Cette action est irréversible."
                      onOpenChange={handleOpenChange}
                      title="Supprimer le fichier"
                      isOpen={isOpen}
                    >
                      <div className="flex justify-end space-x-2">
                        <DialogClose>
                          <Button size="small">Annuler</Button>
                        </DialogClose>
                        <DialogClose>
                          <Button
                            size="small"
                            onClick={handleDelete}
                            className="bg-[#D2042D] hover:bg-[#D2042D]/70 disabled:hover:bg-[#D2042D]"
                          >
                            Confirmer
                          </Button>
                        </DialogClose>
                      </div>
                    </Dialog>
                    <Button
                      className="w-[140px] h-[28px]"
                      size="small"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>

              {/* item */}
              <div className="-mx-4  bg-gray-50 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-10">
                <dt className="text-sm font-semibold leading-6 text-gray-900">
                  {dataItem.title}
                </dt>
                <br />
                <img src={logo} alt="file" className="h-10 w-10 rounded-lg" />

                <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                  <div className="sm:pr-4">
                    <dt className="inline text-gray-500">Créé le </dt>{' '}
                    <dd className="inline text-gray-700">
                      <time dateTime="2023-23-01">
                        {formatDate(dataItem.createdAt)}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:pl-4">
                    <dt className="inline text-gray-500">Modifié le</dt>{' '}
                    <dd className="inline text-gray-700">
                      <time dateTime="2023-31-01">
                        {formatDate(dataItem.updatedAt)}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                    <dt className="font-semibold text-gray-900">
                      Description du fichier
                    </dt>
                    <dd className="mt-2 text-gray-500">
                      <span className="font-medium text-gray-900">
                        {dataItem.description}
                      </span>
                    </dd>
                  </div>
                  <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                    <dt className="font-semibold text-gray-900">
                      URL du fichier
                    </dt>
                    <dd className="mt-2 text-gray-500">
                      <span className="font-medium text-gray-900">
                        {dataItem.url}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* View */}
              <div className="-mx-4 col-start-1 bg-gray-50 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-0 xl:px-16 xl:pb-20 xl:pt-10">
                {dataItem.format === 'png_pipe' ? (
                  <img
                    src={`${VITE_URI}/uploads/download/${dataItem.id}`}
                    alt="file"
                    className="h-auto w-auto rounded-lg"
                  />
                ) : (
                  <Lottie
                    src="/fileNotFound.json"
                    autoplay
                    loop
                    className="h-32"
                  />
                )}
              </div>

              <div className="lg:col-start-3 bg-gray-50 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
                <CommentForm
                  filteredComments={filteredComments}
                  handleChangeComment={handleChangeComment}
                  handleFormSubmit={handleFormSubmit}
                />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}
