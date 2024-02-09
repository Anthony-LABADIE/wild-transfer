import { useEffect, useState } from 'react'

import HomePageconnectedDesktop from '../../components/home/HomePageconnected-desktop'
import HomePageconnectedMobile from '../../components/home/HomePageconnected-mobile'

const HomePageconnected = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)
  const [showDocument, setShowDocument] = useState(false) // État pour afficher ou masquer le composant DocumentComponent

  const handleDocumentClick = () => {
    setShowDocument(true) // Afficher le composant DocumentComponent lorsque le bouton est cliqué
  }

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {isDesktop ? (
        <HomePageconnectedDesktop
          showDocument={showDocument}
          setShowDocument={setShowDocument}
          handleDocumentClick={handleDocumentClick}
        />
      ) : (
        <HomePageconnectedMobile
          showDocument={showDocument}
          setShowDocument={setShowDocument}
          handleDocumentClick={handleDocumentClick}
        />
      )}
    </>
  )
}

export default HomePageconnected
