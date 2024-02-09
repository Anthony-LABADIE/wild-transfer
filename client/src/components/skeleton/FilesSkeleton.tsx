import Layout from '../../layout/Layout'

const FilesSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <tr key={index}>
      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
        <div className="flex items-center gap-x-4">
          <div className="h-10 w-10 rounded-lg bg-gray-300 animate-pulse" />
          <div className="truncate w-32 h-6 bg-gray-300 animate-pulse" />
        </div>
      </td>
      {/* Render other skeleton columns */}
      {/* ... */}
    </tr>
  ))
  return (
    <>
      <Layout>
        <div className="pt-11">
          <h2 className="px-4 pb-4 text-2xl font-semibold leading-7 text-[#303535] sm:px-6 lg:px-2">
            Mes dossiers
          </h2>
          <table className="mt-6 w-full whitespace-nowrap text-left">
            <colgroup className="border-t border-stone-400">
              <col className="w-full sm:w-4/12" />
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
                  className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                >
                  taille
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                >
                  Déposé le
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {/* Render skeleton loading rows */}
              {skeletonRows}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  )
}

export default FilesSkeleton
