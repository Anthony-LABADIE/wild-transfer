import { gql } from '@apollo/client'

export const SHARED_ALL_URL_BY_ID = gql`
  query Query($userId: String!) {
    SharedUrlByUserId(userId: $userId) {
      title
      author {
        username
        id
      }
      createdAt
      id
      updatedAt
    }
  }
`
