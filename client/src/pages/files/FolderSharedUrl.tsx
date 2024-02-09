import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import LogoUrl from '../../assets/url.png'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import FilesSkeleton from '../../components/skeleton/FilesSkeleton'
import { SHARED_URL_BY_USEREMAIL } from '../../graphql/queries/SharedUrlByEmail.queries'
import useAuth from '../../hooks/useAuth'
import Layout from '../../layout/Layout'
import { formatDate } from '../../lib/utils/common'
import Lottie from '../../ui/lottie/Lottie'

export interface Item {
  sharedUrl: {
    id: string
    title: string
    createdAt: string
  }
  email: string
  user: {
    username: string
  }
}

const FolderSharedUrl = () => {
  const { user } = useAuth()

  const { error, loading, data } = useQuery(SHARED_URL_BY_USEREMAIL, {
    variables: { email: user?.email },
  })
  const [activityItems, setActivityItems] = useState([])

  useEffect(() => {
    if (data) {
      setActivityItems(data.UserSharedUrlByEmail)
    }
  }, [data])

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
          <div>
            <table className="mt-6 w-full whitespace-nowrap text-left">
              <colgroup className="border-t border-stone-400">
                <col className="lg:w-4/12" />
                <col className="lg:w-4/12" />
                <col className="lg:w-2/12" />
                <col className="lg:w-1/12" />
                <col className="lg:w-1/12" />
              </colgroup>
              <thead className="border-b border-stone-400 text-sm leading-6 text-[#303535]">
                <tr>
                  <th
                    scope="col"
                    className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                  >
                    Nom
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                  >
                    Utilisateur
                  </th>
                  <th
                    scope="col"
                    className="hidden  py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-8 sm:text-left lg:pr-20"
                  >
                    Déposé le
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                  >
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-300">
                {activityItems.map((item: Item) => (
                  <tr key={`/share-url/${item.sharedUrl.id}`}>
                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8 align-middle">
                      <Link to={item.sharedUrl.id}>
                        <div className="flex items-center gap-x-4">
                          <img
                            src={LogoUrl}
                            alt=""
                            className="h-10 w-10 rounded-lg"
                          />
                          <div className="truncate text-sm w-28 md:w-full font-medium leading-6 text-neutral-800">
                            {item.sharedUrl.title}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="hidden py-4 pl-0  md:table-cell pr-4 text-sm leading-6 sm:pr-8 lg:pr-20 align-middle">
                      <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                        <div className="hidden text-[#303535] sm:block">
                          User
                        </div>
                      </div>
                    </td>
                    {/*user*/}
                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8 align-middle">
                      <div className="flex gap-x-3">
                        <div className="font-mono text-sm leading-6 text-[#303535]">
                          {formatDate(item.sharedUrl.createdAt)}
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-8 text-sm  md:table-cell leading-6 text-[#303535] lg:pr-20 align-middle">
                      Lien partagé
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default FolderSharedUrl
