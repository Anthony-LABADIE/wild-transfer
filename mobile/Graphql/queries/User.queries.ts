import { gql } from '@apollo/client'

export const LOGIN = gql`
  query Login($userLoginInfos: UserLoginInput!) {
    Login(userLoginInfos: $userLoginInfos) {
      ... on UserLogin {
        username
        token
        id
        role
        email
      }
      ... on MessageGql {
        message
        success
      }
    }
  }
`
export const USERSLIST = gql`
  query GetUsers {
    UserList {
      id
      username
      email
      imgUrl
      createdAt
      updatedAt
    }
  }
`

export const CHECKTOKEN = gql`
  query CheckToken($token: String) {
    CheckToken(token: $token) {
      ... on UserWithToken {
        token
        user {
          id
          role
          username
          email
        }
      }
      ... on MessageGql {
        message
        success
      }
    }
  }
`
