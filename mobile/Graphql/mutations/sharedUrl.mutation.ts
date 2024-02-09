import { gql } from '@apollo/client'

export const CREATE_SHARED_URL = gql`
  mutation Mutation(
    $sharedUrlToCreateWithFilesAndUsers: sharedUrlToCreateWithFilesAndUsers!
  ) {
    CreateSharedUrlWithFilesAndUsers(
      sharedUrlToCreateWithFilesAndUsers: $sharedUrlToCreateWithFilesAndUsers
    ) {
      ... on SharedUrl {
        title
        id
        author {
          username
          id
        }
        userSharedUrls {
          email
          id
        }
      }
    }
  }
`
