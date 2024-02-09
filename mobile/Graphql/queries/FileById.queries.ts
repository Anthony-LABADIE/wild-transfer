import { gql } from '@apollo/client'

export const FILEBYID = gql`
  query FileById($fileByIdId: String!) {
    FileById(id: $fileByIdId) {
      id
      author {
        username
      }
      comments {
        id
        content
      }
      createdAt
      duration
      description
      format
      isPublic
      title
      updatedAt
      url
    }
  }
`
