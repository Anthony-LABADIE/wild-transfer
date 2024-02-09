import Layout from '../../layout/Layout'
import Button from '../../ui/button/Button'
import Upload from '../upload/Upload'

// Importez le composant DocumentComponent

interface HomePageconnectedDesktopProps {
  showDocument: boolean
  handleDocumentClick: () => void
  setShowDocument: (value: boolean) => void
}

const HomePageconnectedDesktop: React.FC<HomePageconnectedDesktopProps> = ({
  showDocument,
  handleDocumentClick,
  setShowDocument,
}) => {
  return (
    <>
      <Layout>
        <div className="h-screen flex flex-col border-b border-gray-200 lg:border-0">
          <div className="relative flex-grow">
            <div
              aria-hidden="true"
              className="absolute hidden h-full w-1/2 lg:block"
            />
            <div className="relative bg-gray-100 lg:bg-transparent">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
                <div className="mx-auto max-w-2xl py-24">
                  <div className="lg:pr-16">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                      Partager des fichiers en toute sécurité
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                      100% confidentiel, 100% gratuit
                    </p>
                    <div className="mt-20">
                      <Button className="text-xl" onClick={handleDocumentClick}>
                        Envoyer un document
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-48 w-full sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5412270/pexels-photo-5412270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Layout>
      {showDocument && <Upload setShowDocument={setShowDocument} />}
    </>
  )
}

export default HomePageconnectedDesktop
