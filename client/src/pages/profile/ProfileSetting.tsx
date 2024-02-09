import { useMutation } from '@apollo/client'
import { SetStateAction, useState } from 'react'

import { UPDATE_USER } from '../../graphql/mutations/user.mutation'
import useAuth from '../../hooks/useAuth'
import Layout from '../../layout/Layout'

const ProfileSetting = () => {
  const { user } = useAuth()

  const [updateUser] = useMutation(UPDATE_USER)
  const [email, setEmail] = useState(user?.email)
  const [username, setUsername] = useState(user?.username)

  const handleEmailChange = (event: {
    target: { value: SetStateAction<string | undefined> }
  }) => {
    setEmail(event.target.value)
  }

  const handleUsernameChange = (event: {
    target: { value: SetStateAction<string | undefined> }
  }) => {
    setUsername(event.target.value)
  }

  const handleUpdateProfile = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const { ...data } = Object.fromEntries(formData.entries())

    try {
      const response = await updateUser({
        variables: {
          id: user?.id,
          data,
        },
      })
      if (response.data.UpdateUser.success) {
        alert('Profile updated successfully!')
      } else {
        alert(response.data.UpdateUser.message)
      }
    } catch (error) {
      alert('Failed to update profile. Please try again.')
      console.error(error)
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
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                  />
                  <div>
                    <button
                      type="button"
                      className="rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-[#090A0A] shadow-sm hover:bg-white/20"
                    >
                      Changer l'avatar
                    </button>
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
                      value={email}
                      onChange={handleEmailChange}
                      type="email"
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
                        value={username}
                        onChange={handleUsernameChange}
                        id="username"
                        autoComplete="username"
                        className="block w-full p-2 bg-slate-50 rounded-md border-0 py-1.5 text-[#090A0A] shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid mt-4 grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium leading-6 text-[#090A0A]"
                  >
                    Mot de passe actuel
                  </label>
                  <div className="mt-2">
                    <input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      autoComplete="oldPassword"
                      className="block w-full p-2 bg-slate-50 rounded-md border-0 py-1.5 text-[#090A0A] shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium leading-6 text-[#090A0A]"
                  >
                    Nouveau mot de passe
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      className="block w-full p-2 bg-slate-50 rounded-md border-0 py-1.5 text-[#090A0A] shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium leading-6 text-[#090A0A]"
                  >
                    Confirmez le mot de passe
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm_password"
                      type="password"
                      autoComplete="new-password"
                      className="block w-full p-2 bg-slate-50 rounded-md border-0 py-1.5 text-[#090A0A] shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
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
