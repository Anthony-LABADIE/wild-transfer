import { ImageSourcePropType } from 'react-native'

export function formatDate(dateString) {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  const formattedDate = new Date(dateString).toLocaleString(
    'fr-FR',
    options as Intl.DateTimeFormatOptions,
  )
  return formattedDate
}

export const getFileIcon = (fileType: string): ImageSourcePropType => {
  switch (true) {
    case /pdf/.test(fileType):
      return require('../assets/file/pdf.png')

    case /image|png|jpg|jpeg|gif/.test(fileType):
      return require('../assets/file/png.png')

    case /audio|mp3|wav|flac/.test(fileType):
      return require('../assets/file/mp3.jpg')

    case /video|mp4|avi|mkv/.test(fileType):
      return require('../assets/file/mp4.png')

    case /text|txt|md/.test(fileType):
      return require('../assets/file/txt.png')

    default:
      return require('../assets/file/file.png')
  }
}
