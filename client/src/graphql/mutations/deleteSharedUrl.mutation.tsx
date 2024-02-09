import { gql } from '@apollo/client'

export const DELETE_SHARED_URL = gql`
  mutation DeleteSharedUrl($deleteSharedUrlId: String!) {
    DeleteSharedUrl(id: $deleteSharedUrlId)
  }
`
