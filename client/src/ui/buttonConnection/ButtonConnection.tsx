import cn from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'

export interface ButtonConnectionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Allows adding classes to the container
   */
  className?: string
  /**
   * Size of button
   */
  size?: 'large' | 'medium' | 'small'
  /**
   * Alert variants
   */
  variant?: 'apple' | 'google' | 'github'
}
const classes = {
  base: 'inline-flex flex items-center justify-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black border-[1px] border- solid border-[#CCD1E3] [box - shadow: 0px_1px_3px_rgba(0, _0, _0, _0.1)] hover:bg-[#F8F9F9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  small: 'w-[200px] h-[48px]',
  medium: 'w-[268px] h-[53px]',
  large: 'w-[500px] h-[48px]',
}

export const ButtonConnection: FC<ButtonConnectionProps> = (props) => {
  const {
    className,
    size = 'medium',
    variant = 'apple',
    children,
    ...rest
  } = props
  const classesName = cn(
    classes.base,
    {
      [classes.small]: size === 'small',
      [classes.medium]: size === 'medium',
      [classes.large]: size === 'large',
    },
    className,
  )

  let ImgButton

  switch (variant) {
    case 'google':
      ImgButton = '/google.svg'
      break
    case 'apple':
      ImgButton = '/apple.svg'
      break
    case 'github':
      ImgButton = '/github.svg'
      break
    default:
      ImgButton = '/google.svg'
  }

  return (
    <button className={classesName} {...rest}>
      <span>
        <img src={ImgButton} alt="imgLogo" className="w-[25px]" />
      </span>
      {children}
    </button>
  )
}

export default ButtonConnection
