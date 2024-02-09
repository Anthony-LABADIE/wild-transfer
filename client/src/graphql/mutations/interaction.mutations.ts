import { gql } from '@apollo/client'

export const CREATE_INTERACTION = gql`
  mutation Mutation($interactionToCreate: InteractionToCreate!) {
    CreateInteraction(InteractionToCreate: $interactionToCreate) {
      ... on Interaction {
        id
        emoji {
          iconName
          iconColor
          bgColor
        }
      }
      ... on MessageGql {
        message
        success
      }
    }
  }
`
