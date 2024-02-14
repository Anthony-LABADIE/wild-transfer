import { gql } from '@apollo/client'

export const DELETE_SHARED_URL = gql`
  mutation Mutation($deleteSharedUrlId: String!) {
    DeleteSharedUrl(id: $deleteSharedUrlId)
  }
`
