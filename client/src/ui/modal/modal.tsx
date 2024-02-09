import {
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  ShareIcon,
} from '@heroicons/react/20/solid'
import { ChangeEvent, useState } from 'react'

import Button from '../button/Button'
import Title from '../title/Title'

type formData = {
  title: string
  email: string
  message: string
}

type setFormData = (data: {
  title: string
  email: string
  message: string
}) => void

interface ModalProps {
  formData?: formData
  setFormData?: setFormData
  isAtLeastOneSelected?: boolean
  onShareClick?: () => void
  buttonIsDisabled?: boolean
}

type InputChangeEvent = ChangeEvent<HTMLInputElement>

const Modal: React.FC<ModalProps> = ({
  formData = { title: '', email: '', message: '' },
  setFormData,
  onShareClick,
  isAtLeastOneSelected = false,
  buttonIsDisabled,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (key: string, value: string) => {
    if (setFormData) {
      setFormData({
        ...formData,
        [key]: value,
      })
    }
  }

  const handleSubmit = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  const buttonClass = ` ${
    isAtLeastOneSelected
      ? 'flex items-center gap-2 px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200'
      : 'flex items-center gap-2 px-4 py-2 text-gray-400 bg-gray-200 rounded-lg duration-150'
  }`
  const onClickShare = () => {
    if (onShareClick) {
      onShareClick()
    }
  }

  return (
    <>
      {buttonIsDisabled && (
        <button
          className={buttonClass}
          onClick={isAtLeastOneSelected ? handleOpen : undefined}
          disabled={!isAtLeastOneSelected}
        >
          <ShareIcon className="w-5 h-5" />
          Partager
        </button>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center"
          onClick={onClickShare}
        >
          <div
            className="w-96 md:w-auto bg-white p-16 rounded-xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              <div className="flex justify-center">
                <Title className="text-center" />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <fieldset className="Fieldset relative">
                    <ShareIcon className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" />
                    <input
                      className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      placeholder="Entrer le nom de votre lien partagé"
                      value={formData.title}
                      onChange={(e: InputChangeEvent) =>
                        handleChange('title', e.target.value)
                      }
                    />
                  </fieldset>
                </div>
                <fieldset className="Fieldset relative">
                  {/* Champ pour l'email */}
                  <EnvelopeIcon className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" />
                  <input
                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    placeholder="Entrer l'email du destinataire"
                    value={formData.email}
                    onChange={(e: InputChangeEvent) =>
                      handleChange('email', e.target.value)
                    }
                  />
                </fieldset>
                <fieldset className="Fieldset relative">
                  {/* Champ pour le message */}
                  <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" />
                  <input
                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e: InputChangeEvent) =>
                      handleChange('message', e.target.value)
                    }
                  />
                </fieldset>
              </div>
              <div className="flex gap-6 mt-5 justify-between">
                <Button className="w-36" onClick={handleClose}>
                  Annuler
                </Button>
                <Button onClick={onClickShare} type="submit" className="w-36">
                  Envoyer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
