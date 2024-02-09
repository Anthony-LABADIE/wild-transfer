import { BellIcon } from '@heroicons/react/24/outline'

import DropdownProfile from '../../ui/dropdownProfile/DropdownProfile'

const DropdownProfiles = ({ handleSignOut }: { handleSignOut: () => void }) => {
  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      <button
        type="button"
        className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Profile dropdown */}
      <DropdownProfile handleSignOut={handleSignOut} />
    </div>
  )
}

export default DropdownProfiles
