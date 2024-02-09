import { gql } from "@apollo/client/core";

export const CREATE_USER = gql`
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
`;
export const GET_ALL_USERS = gql`
  query Query {
    UserList {
      id
      username
      email
      imgUrl
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $data: UserUpdateInput!) {
    UpdateUser(id: $id, userToUpdate: $data) {
      message
      success
    }
  }
`;
export const CHECK_TOKEN = gql`
  query CheckToken {
    checkToken
  }
`;
