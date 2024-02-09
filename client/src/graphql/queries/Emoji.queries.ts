import { gql } from '@apollo/client'

export const EMOJILIST = gql`
  query Query {
    EmojiList {
      id
      iconName
      iconColor
      bgColor
      name
    }
  }
`
export const EMOJISBYCOMMENT = gql`
  query Query($commentId: String!) {
    GetInteractionByCommentId(commentId: $commentId) {
      id
      author {
        username
      }
      emoji {
        bgColor
        iconColor
        iconName
        name
      }
    }
  }
`
