import { useMutation } from '@apollo/client'
import { useState } from 'react'

import logoUser from '../../assets/utilisateur.png'
import { CREATE_SHARED_URL } from '../../graphql/mutations/updateUser'
import useAuth from '../../hooks/useAuth'
import Layout from '../../layout/Layout'

const ProfileSetting = () => {
  const { user } = useAuth()

  const [image, setImage] = useState<File | null>(null)
  const [updateUser] = useMutation(CREATE_SHARED_URL, {
    fetchPolicy: 'no-cache',
  })
  const VITE_URI = import.meta.env['VITE_URI'] as string

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!image) {
      alert('Please select an image to upload.')
      return
    }

    const formData = new FormData()
    formData.append('avatar', image)

    console.log(image)

    try {
      const response = await fetch(`${VITE_URI}/uploads/profile`, {
        method: 'POST',
        body: formData,
      })

      console.log(await response)
      console.log(`/uploads/profileUploads/${image.name}`, '🔵')

      if (response.ok) {
        alert('Profile updated successfully!')
        try {
          await updateUser({
            variables: {
              userToUpdate: {
                imgUrl: `/uploads/profileUploads/${image.name}`,
              },
              updateUserId: user?.id,
            },
          })
        } catch (error) {
          alert('Failed to update profile. Please try again.')
          console.error(error)
        }
      }
    } catch (error) {
      alert('Failed to update profile. Please try again.')
      console.error(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e?.target?.files?.[0] ?? null)
    }
  }

  return (
    <>
      <Layout>
        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-neutral-950">
                Informations personnelles
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-800">
                Utilisez une adresse permanente où vous pouvez recevoir du
                courrier.
              </p>
            </div>

            <form className="md:col-span-2" onSubmit={handleUpdateProfile}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full flex items-center gap-x-8">
                  {user?.imgUrl !== null ? (
                    <img
                      src={`${VITE_URI}/uploads/profile/${user?.id}`}
                      alt=""
                      className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                    />
                  ) : (
                    <img
                      src={logoUser}
                      alt="image"
                      className="h-24 w-24 flex-none rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <input
                      id="fileInput"
                      type="file"
                      name="image"
                      className="hidden"
                      required
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="fileInput"
                      className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
                    >
                      Choisir un fichier
                    </label>
                    <p className="mt-2 text-xs leading-5 text-slate-900">
                      JPG, GIF ou PNG. 1 Mo maximum.
                    </p>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-[#090A0A]"
                  >
                    Adresse e-mail
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      value={user?.email}
                      autoComplete="email"
                      className="block w-full p-2 bg-slate-50 rounded-md border-0 py-1.5 text-[#090A0A] shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-[#090A0A]"
                  >
                    Nom d'utilisateur
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="text"
                        value={user?.username}
                        id="username"
                        autoComplete="username"
                        className="block w-full p-2 bg-slate-50 rounded-md border-0 py-1.5 text-[#090A0A] shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-neutral-950">
                Supprimer le compte
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-800">
                Vous ne souhaitez plus utiliser notre service ? Vous pouvez
                supprimer votre compte ici. Cette action n'est pas réversible.
                Toutes les informations liées à ce compte seront supprimées de
                manière permanente.
              </p>
            </div>

            <form className="md:col-span-2">
              <button
                type="submit"
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
              >
                Oui, supprimer mon compte
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ProfileSetting
