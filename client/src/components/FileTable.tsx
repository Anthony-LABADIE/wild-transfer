import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import LogoFile from '../assets/file.png'
import LogoUrl from '../assets/url.png'
import { formatDate } from '../lib/utils/common'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown/Dropdown'
import Modal from '../ui/modal/modal'

interface Item {
  id: string
  username: string
  author: {
    username: string
  }
  user: {
    username: string
  }
  title: string
  description: string
  duration: string
  format: string
  createdAt: string
  updatedAt: string
  date: string
}

interface FileTableProps {
  data: Item[]
  onEdit: (value: string, id: string, title: string) => void
  link: (id: string) => string
  getUserName: (item: Item) => string
  logo: string
  partager: boolean
  onCheckboxChange?: (id: string) => void
  onShareClick?: () => void
  formData?: { title: string; email: string; message: string }
  setFormData?: (data: {
    title: string
    email: string
    message: string
  }) => void
}

const FileTable = ({
  data,
  onEdit,
  link,
  getUserName,
  logo,
  partager,
  onCheckboxChange,
  onShareClick,
  formData,
  setFormData,
}: FileTableProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const isAtLeastOneSelected = selectedIds.length > 0
  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }

    // Vérifiez si la fonction de rappel onCheckboxChange est définie avant de l'appeler
    if (onCheckboxChange) {
      onCheckboxChange(id)
    }
  }
  const resetSelectedIds = () => {
    setSelectedIds([])
  }

  const itemsDropdown = [
    {
      value: 'Modifier',
    },
    {
      value: 'Supprimer',
    },
    {
      value: 'Télécharger',
    },
  ]

  const itemLogo = [
    {
      value: 'file',
      logo: LogoFile,
    },
    {
      value: 'url',
      logo: LogoUrl,
    },
  ]

  return (
    <div>
      <Modal
        formData={formData}
        setFormData={setFormData}
        onShareClick={() => {
          resetSelectedIds() // Réinitialiser les sélections lors du partage
          onShareClick && onShareClick()
        }}
        isAtLeastOneSelected={isAtLeastOneSelected}
        buttonIsDisabled={isAtLeastOneSelected}
      />

      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup className="border-t border-stone-400">
          {partager === true ? <col className="lg:w-2/12" /> : null}
          <col className="lg:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-stone-400 text-sm leading-6 text-[#303535]">
          <tr>
            {partager === true ? (
              <th
                scope="col"
                className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
              >
                Partager
              </th>
            ) : null}
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
            <th
              scope="col"
              className="py-2 pl-0 pr-4 text-right font-semibold  sm:pr-6 lg:pr-8"
            >
              Editer
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-300">
          {data.map((item: Item) => (
            <tr key={item.id}>
              {partager === true ? (
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8 w-1/12 align-middle">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
              ) : null}
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8 align-middle">
                <Link to={link(item.id)}>
                  <div className="flex items-center gap-x-4">
                    <img
                      src={itemLogo.find((i) => i.value === logo)?.logo}
                      alt=""
                      className="h-10 w-10 rounded-lg"
                    />
                    <div className="truncate text-sm w-28 md:w-full font-medium leading-6 text-neutral-800">
                      {item.title}
                    </div>
                  </div>
                </Link>
              </td>
              <td className="hidden py-4 pl-0  md:table-cell pr-4 text-sm leading-6 sm:pr-8 lg:pr-20 align-middle">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <time
                    className="text-[#303535] sm:hidden"
                    dateTime={item.duration}
                  >
                    {item.date}
                  </time>
                  <div className="hidden text-[#303535] sm:block">
                    {getUserName(item).charAt(0).toUpperCase() +
                      getUserName(item).slice(1)}
                  </div>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8 align-middle">
                <div className="flex gap-x-3">
                  <div className="font-mono text-sm leading-6 text-[#303535]">
                    {formatDate(item.createdAt)}
                  </div>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-8 text-sm  md:table-cell leading-6 text-[#303535] lg:pr-20 align-middle">
                {item.format ? item.format : ''}
              </td>
              <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 text-[#303535] sm:pr-6 lg:pr-8 align-middle">
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded-[5px]  flex justify-center items-center w-10 border-[0.5px] border-solid border-[#DFE1E4] bg-[#EDEFF4] p-0 text-[#3E414B] dark:border-[#292B2E] dark:bg-[#191919] dark:text-[#EDEFF4]">
                    <DotsVerticalIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {itemsDropdown.map(({ value }, index) => (
                      <DropdownMenuItem
                        className="flex cursor-pointer h-[34px] justify-between w-[90px] flex-row items-center rounded-[3px] hover:bg-[#F8F9F9] focus:border-solid focus:border-[#8291C3] focus:[box-shadow:inset_0px_0px_0px_2px_rgba(130,_145,_195,_0.3)] active:bg-[#CCD1E3] dark:bg-[#191919] dark:text-[#EDEFF4] dark:hover:bg-[#262626] dark:active:bg-[#3E414B]"
                        key={index}
                        onClick={() => onEdit(value, item.id, item.title)}
                      >
                        <DropdownMenuLabel className="mx-[12px] text-[12px] font-[400] not-italic leading-[18px]">
                          {value}
                        </DropdownMenuLabel>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FileTable
