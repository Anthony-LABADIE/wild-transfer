import { gql } from '@apollo/client'

export const CREATE_COMMENT_SHARE_URL = gql`
  mutation Mutation($commentToCreate: CommentToCreate!) {
    createComment(commentToCreate: $commentToCreate) {
      content
      createdAt
      author {
        username
      }
    }
  }
`
