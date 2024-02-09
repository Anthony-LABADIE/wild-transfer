import { useEffect } from 'react'

interface Props {
  src: string
  className?: string
  autoplay?: boolean
  loop?: boolean
}

const Lottie = ({ src, className, autoplay, loop }: Props) => {
  /**
   * We import the player dynamically to fix the issue `ReferenceError: window is not defined`
   * https://github.com/dotlottie/player-component/issues/46#issuecomment-1304681885
   */
  useEffect(() => {
    import('@dotlottie/player-component')
  }, [])

  return (
    <dotlottie-player
      src={src}
      class={className}
      autoplay={autoplay}
      loop={loop}
    />
  )
}

export default Lottie
