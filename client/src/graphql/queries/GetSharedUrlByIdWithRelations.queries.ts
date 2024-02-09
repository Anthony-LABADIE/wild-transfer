import { gql } from '@apollo/client'

export const GETSHAREDURLBYID = gql`
  query Query($sharedUrlByIdId: String!) {
    SharedUrlById(id: $sharedUrlByIdId) {
      title
      author {
        username
        id
      }
      createdAt
      id
      updatedAt
      files {
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
  }
`
