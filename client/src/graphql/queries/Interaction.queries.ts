import { gql } from '@apollo/client'

export const GetInteractionByAuthorAndComment = gql`
  query Query($commentId: String!, $authorId: String!) {
    GetInteractionByAuthorIdAndCommentId(
      commentId: $commentId
      authorId: $authorId
    ) {
      author {
        id
        username
      }
      emoji {
        bgColor
        iconColor
        iconName
      }
      comment {
        id
      }
    }
  }
`
