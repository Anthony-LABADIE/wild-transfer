import { Bars3Icon } from '@heroicons/react/20/solid'

const BurgerMenuSideBar = ({
  setSidebarOpen,
}: {
  setSidebarOpen: (value: boolean) => void
}) => {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-black xl:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}

export default BurgerMenuSideBar
