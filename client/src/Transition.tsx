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

        <Route
          path="/send-document"
          element={
            <ProtectedRoute>
              <SendDocument />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePageconnected />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileSetting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/files"
          element={
            <ProtectedRoute>
              <Files />
            </ProtectedRoute>
          }
        />
        <Route
          path="/share-url"
          element={
            <ProtectedRoute>
              <SharedUrl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/folder-share-url"
          element={
            <ProtectedRoute>
              <FolderSharedUrl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/share-url/:id"
          element={
            <ProtectedRoute>
              <FileSharedUrlDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/folder-share-url/:id"
          element={
            <ProtectedRoute>
              <FileSharedUrlDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/share-url/:id/:id"
          element={
            <ProtectedRoute>
              <FileDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/files/:id"
          element={
            <ProtectedRoute>
              <FileDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/layout"
          element={
            <ProtectedRoute>
              <Layout children />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default Transition
