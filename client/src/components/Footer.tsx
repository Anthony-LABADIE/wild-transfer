import { Folder, Home, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 py-6 flex justify-around">
      <Link to="/home">
        <Home size={30} color="#979C9E" />
      </Link>
      <Link to="/file">
        <Folder size={30} color="#979C9E" />
      </Link>
      <Link to="/profile">
        <User size={30} color="#979C9E" />
      </Link>
    </footer>
  )
}
