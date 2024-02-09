import { gql } from '@apollo/client'

export const FILELISTBYAUTHORID = gql`
  query FileListByAuthorId($id: String!) {
    FileListByAuthorId(id: $id) {
      createdAt
      description
      duration
      format
      id
      isPublic
      title
      updatedAt
      url
      author {
        username
      }
    }
  }
`
