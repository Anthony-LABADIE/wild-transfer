import { useEffect, useState } from 'react'

import HomePageDesktop from '../../components/home/HomePage-desktop'
import HomePageMobile from '../../components/home/HomePage-mobile'

const HomePage = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <>{isDesktop ? <HomePageDesktop /> : <HomePageMobile />}</>
}

export default HomePage
