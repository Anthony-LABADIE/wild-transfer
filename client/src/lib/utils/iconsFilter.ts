import { InteractionResponse, Mood } from '../../interfaces/interfaces'

export type IconListWithCount = {
  emoji: Mood
  count: number
}

const iconFilter = (
  interactions: (InteractionResponse & { count: number })[],
) => {
  if (!interactions) return []

  const IconListWithCount: Map<string, IconListWithCount> = new Map()

  interactions.forEach((interaction) => {
    if (!IconListWithCount.has(interaction.emoji.iconName)) {
      IconListWithCount.set(interaction.emoji.iconName, {
        emoji: interaction.emoji,
        count: 1,
      })
    } else {
      const iconWithCount = IconListWithCount.get(interaction.emoji.iconName)
      if (iconWithCount) {
        iconWithCount.count++
      }
    }
  })

  const filteredUniqueIcons: IconListWithCount[] = Array.from(
    IconListWithCount.values(),
  ).sort((a, b) => b.count - a.count)

  const result = filteredUniqueIcons.map((emoji) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { count, ...rest } = emoji
    return rest.emoji
  })
  return result
}

export default iconFilter
