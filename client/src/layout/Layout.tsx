import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className=" bg-gray-100 max-h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout
