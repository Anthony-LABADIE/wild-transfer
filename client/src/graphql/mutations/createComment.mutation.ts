import { gql } from '@apollo/client'

export const CREATE_COMMENT = gql`
  mutation Mutation($commentToCreate: CommentToCreate!) {
    createComment(commentToCreate: $commentToCreate) {
      file {
        id
      }
      content
      createdAt
      author {
        username
      }
    }
  }
`
