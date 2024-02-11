import { gql } from '@apollo/client'

export const CREATE_FILE = gql`
  mutation Mutation($fileToCreate: FileToCreate!) {
    CreateFile(fileToCreate: $fileToCreate) {
      author {
        username
      }
      createdAt
      description
      duration
      format
      id
      isPublic
      title
      url
    }
  }
`
