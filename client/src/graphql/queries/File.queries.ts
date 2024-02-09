import { gql } from '@apollo/client'

export const FILELIST = gql`
  query Query {
    FileList {
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
