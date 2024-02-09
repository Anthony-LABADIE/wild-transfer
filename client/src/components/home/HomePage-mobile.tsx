import Button from '../../ui/button/Button'
import Link from '../../ui/link/Link'
import Lottie from '../../ui/lottie/Lottie'
import Title from '../../ui/title/Title'

const HomePageMobile = () => {
  const navigateToLogin = () => {
    window.location.href = '/register'
  }

  return (
    <div>
      <div className="flex items-center justify-center translate-y-10">
        <Title />
      </div>
      <div className="translate-y-[-30px]">
        <Lottie src="animationHomePage.json" autoplay loop />
      </div>
      <div>
        <p className="ml-6 text-lg">Gratuit</p>
        <hr className="my-2 mx-7 border-gray-300" />
        <p className="ml-6 text-lg">
          Pour les expéditeur occasionnels de fichiers
        </p>
      </div>
      <div className="flex flex-col gap-20 items-center justify-center mt-20">
        <Button onClick={navigateToLogin} className="text-xl">
          S'inscrire
        </Button>
        <div className="flex">
          <p>{`Vous avez déjà un compte ?`}&nbsp;</p>
          <Link to="/login" className="text-primary">
            Connectez-vous
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePageMobile
