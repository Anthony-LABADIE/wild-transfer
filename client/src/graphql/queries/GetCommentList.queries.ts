import { gql } from '@apollo/client'

export const GET_COMMENT_LIST = gql`
  query Query {
    commentsList {
      id
      content
      author {
        id
        username
      }
      file {
        id
      }
      sharedUrl {
        id
      }
      createdAt
    }
  }
`
