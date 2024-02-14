import { gql } from '@apollo/client'

export const VERIFY_TOKEN = gql`
  query Query($token: String) {
    CheckToken(token: $token) {
      ... on UserWithToken {
        token
        user {
          id
        }
      }
    }
  }
`
