import { gql } from '@apollo/client'

export const SHARED_URL_BY_USEREMAIL = gql`
  query Query($email: String!) {
    UserSharedUrlByEmail(email: $email) {
      sharedUrl {
        id
        title
        createdAt
      }
      email
      user {
        username
      }
    }
  }
`
