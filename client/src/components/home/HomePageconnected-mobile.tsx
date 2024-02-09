import Layout from '../../layout/Layout'
import Button from '../../ui/button/Button'
import Lottie from '../../ui/lottie/Lottie'
import Title from '../../ui/title/Title'
import Upload from '../upload/Upload'

interface HomePageconnectedMobileProps {
  showDocument: boolean
  handleDocumentClick: () => void
  setShowDocument: (value: boolean) => void
}

const HomePageconnectedMobile: React.FC<HomePageconnectedMobileProps> = ({
  showDocument,
  handleDocumentClick,
  setShowDocument,
}) => {
  return (
    <>
      <Layout>
        <div className="flex items-center justify-center mt-20">
          <Title />
        </div>
        <div>
          <Lottie
            className="mt-20"
            src="/animationConnected.json"
            autoplay
            loop
          />
        </div>
        <div className="flex justify-center">
          <Button onClick={handleDocumentClick} className="text-xl mt-20">
            Envoyer un document
          </Button>
        </div>
      </Layout>
      {showDocument && <Upload setShowDocument={setShowDocument} />}
    </>
  )
}

export default HomePageconnectedMobile
