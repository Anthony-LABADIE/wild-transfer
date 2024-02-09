import cn from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Allows adding classes to the container
   */
  className?: string
  /**
   * Size of button
   */
  size?: 'large' | 'medium' | 'small'
}
const classes = {
  base: 'rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  small: 'w-[200px] h-[48px]',
  medium: 'w-[314px] h-[48px]',
  large: 'w-[500px] h-[48px]',
}

export const Button: FC<ButtonProps> = (props) => {
  const { className, size = 'medium', children, ...rest } = props
  const classesName = cn(
    classes.base,
    {
      [classes.small]: size === 'small',
      [classes.medium]: size === 'medium',
      [classes.large]: size === 'large',
    },
    className,
  )

  return (
    <button className={classesName} {...rest}>
      {children}
    </button>
  )
}

export default Button
