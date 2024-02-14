import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import logoUser from '../../assets/utilisateur.png'
import useAuth from '../../hooks/useAuth'
import { classNames } from '../../lib/utils/common'

interface DropdownProfileProps {
  handleSignOut: () => void
}

const DropdownProfile: React.FC<DropdownProfileProps> = ({ handleSignOut }) => {
  const { user } = useAuth()
  const VITE_URI = import.meta.env['VITE_URI'] as string

  return (
    <div>
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            {user?.imgUrl !== null ? (
              <img
                src={`${VITE_URI}/uploads/profile/${user?.id}`}
                alt=""
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <img
                src={logoUser}
                alt="image"
                className="h-8 w-8 rounded-full"
              />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  )}
                >
                  Voir profil
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={handleSignOut} // Utilisez la fonction handleSignOut en tant que prop
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  )}
                >
                  Se déconnecter
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default DropdownProfile
