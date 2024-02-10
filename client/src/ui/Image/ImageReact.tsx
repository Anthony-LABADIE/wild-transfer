interface ImageComponentProps {
  src: string
  alt: string
  classNames?: string
}

const ImageComponent = ({ src, alt, classNames }: ImageComponentProps) => {
  return <img src={src} alt={alt} className={classNames} />
}

export default ImageComponent
