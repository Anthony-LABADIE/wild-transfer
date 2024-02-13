import { gql } from '@apollo/client'

export const LOGIN = gql`
  query Login($userLoginInfos: UserLoginInput!) {
    Login(userLoginInfos: $userLoginInfos) {
      ... on UserLogin {
        id
        token
        email
        username
        imgUrl
      }
      ... on MessageGql {
        message
      }
    }
  }
`

export const CHECKTOKEN = gql`
  query CheckToken($token: String!) {
    CheckToken(token: $token) {
      ... on UserWithToken {
        token
        user {
          id
          role
          username
          email
          imgUrl
        }
      }
    }
  }
`
