import LogoFile from '../../assets/file.png'
import LogoPdf from '../../assets/pdf.png'
import LogoUrl from '../../assets/url.png'

export const chooseLogo = (format?: string) => {
  switch (format) {
    case 'pdf':
      return LogoPdf
    case 'png_pipe':
      return LogoFile
    default:
      return LogoUrl
  }
}
