import { gql } from '@apollo/client'

export const CREATE_SHARED_URL = gql`
  mutation Mutation($userToUpdate: UserUpdateInput!, $updateUserId: String!) {
    UpdateUser(userToUpdate: $userToUpdate, id: $updateUserId) {
      success
    }
  }
`
