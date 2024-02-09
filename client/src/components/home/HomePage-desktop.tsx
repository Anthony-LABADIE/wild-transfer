import { Link } from 'react-router-dom'

import Button from '../../ui/button/Button'
import Title from '../../ui/title/Title'

const HomePageDesktop = () => {
  return (
    <>
      <div className="relative">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <Title className="text-[54px]" />
              <div className="hidden sm:mt-32 sm:flex lg:mt-16">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  A propos de nous{' '}
                  <a
                    href="#"
                    className="whitespace-nowrap font-semibold text-indigo-600"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Partagez des fichiers avec vos collègues, vos amis et votre
                famille en toute sécurité. Envoyez des fichiers de toutes
                tailles et de tous types. L'envoi de fichiers est gratuit.
              </p>
              <div className="mt-32 flex items-center gap-x-6">
                <Link to="/register">
                  <Button className="text-xl">S'inscrire</Button>
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Déjà un compte <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img
              className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePageDesktop
