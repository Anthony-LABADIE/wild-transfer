import { Route, Routes } from 'react-router-dom'

import ProtectedRoute from './hooks/ProtectedRoute'
import Layout from './layout/Layout'
import SendDocument from './pages/document/SendDocumentPage'
import FileDetail from './pages/files/FileDetail'
import Files from './pages/files/Files'
import FileSharedUrlDetail from './pages/files/FilesSharedUrlDetail'
import FolderSharedUrl from './pages/files/FolderSharedUrl'
import SharedUrl from './pages/files/SharedUrl'
import HomePage from './pages/home/HomePage'
import HomePageconnected from './pages/home/HomePageConnected'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import ProfileSetting from './pages/profile/ProfileSetting'

const Transition = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/send-document" element={<SendDocument />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePageconnected />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<ProfileSetting />} />
        <Route path="/files" element={<Files />} />
        <Route path="/share-url" element={<SharedUrl />} />
        <Route path="/folder-share-url" element={<FolderSharedUrl />} />
        <Route path="/share-url/:id" element={<FileSharedUrlDetail />} />
        <Route path="/folder-share-url/:id" element={<FileSharedUrlDetail />} />
        <Route path="/share-url/:id/:id" element={<FileDetail />} />
        <Route path="/files/:id" element={<FileDetail />} />
        <Route path="/layout" element={<Layout children />} />
      </Routes>
    </>
  )
}

export default Transition
