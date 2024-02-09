import { gql } from '@apollo/client'

export const DELETE_FILE = gql`
  mutation DeleteFile($deleteFileId: String!) {
    DeleteFile(id: $deleteFileId) {
      success
    }
  }
`
