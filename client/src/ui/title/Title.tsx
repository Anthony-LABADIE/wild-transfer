import cn from 'classnames'

export interface TitleProps {
  /**
   * Allows adding classes to the container
   */
  className?: string
}
const classes = {
  base: 'font-bold text-[34px] leading-8',
}
const Title: React.FC<TitleProps> = (props) => {
  const { className, ...rest } = props
  const classesName = cn(classes.base, className)

  return (
    <h1 className={classesName} {...rest}>
      <span className="text-[#66625D]">Wild</span>
      <span className="text-[#6A2AFE]">Transfert</span>
    </h1>
  )
}

export default Title
