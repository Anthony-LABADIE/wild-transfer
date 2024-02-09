import { gql } from '@apollo/client'

export const SHARED_URL_BY_ID = gql`
  query Query($sharedUrlByIdId: String!) {
    SharedUrlById(id: $sharedUrlByIdId) {
      author {
        username
      }
    }
  }
`
