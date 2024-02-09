import gql from 'graphql-tag'

export const REGISTER = gql`
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

export const USER_UPDATE = gql`
  mutation UpdateUser($id: String!, $data: UserUpdateInput!) {
    UpdateUser(id: $id, userToUpdate: $data) {
      message
      success
    }
  }
`
