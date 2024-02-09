import cn from 'classnames'

export interface Logo {
  /**
   * Allows adding classes to the container
   */
  className?: string
}
const classes = {
  base: 'font-bold text-[34px] leading-8',
}
const Logo: React.FC<Logo> = (props) => {
  const { className, ...rest } = props
  const classesName = cn(classes.base, className)

  return (
    <h1 className={classesName} {...rest}>
      <span className="text-[#66625D] font-serif">W</span>
      <span className="text-[#6A2AFE] font-serif">T</span>
    </h1>
  )
}

export default Logo
