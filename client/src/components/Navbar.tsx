import { Disclosure } from '@headlessui/react'
import { Link } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import Logo from '../ui/logo/Logo'
import Search from '../ui/search/Search'
import BurgerMenuSideBar from './burgerMenu/BurgerMenuSideBar'
import DropdownProfiles from './user/DropdownProfiles'

function Navbar() {
  const { signOut, setSidebarOpen } = useAuth()
  const handleSignOut = () => {
    signOut()
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/home">
                    <Logo />
                  </Link>
                </div>
                <div className="hidden sm:block ml-auto sm:ml-52">
                  <Search />
                </div>
              </div>
              <DropdownProfiles handleSignOut={handleSignOut} />
              <div className=" flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <BurgerMenuSideBar setSidebarOpen={setSidebarOpen} />
                </Disclosure.Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
