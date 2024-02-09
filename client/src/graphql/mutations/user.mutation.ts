import { gql } from '@apollo/client'

export const ADD_USER = gql`
  mutation Mutation($userToCreate: UserCreateInput!) {
    CreateUser(userToCreate: $userToCreate) {
      ... on UserWithoutPassword {
        id
        username
        email
      }
      ... on MessageGql {
        message
        success
      }
    }
  }
`
export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $data: UserUpdateInput!) {
    UpdateUser(id: $id, userToUpdate: $data) {
      message
      success
    }
  }
`

export const CHECK_TOKEN = gql`
  query CheckToken {
    checkToken
  }
`
