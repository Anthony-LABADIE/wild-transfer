import { IconComponent } from './IconComponent'
import { Interaction, Mood } from '../../../interfaces/interfaces'
import { classNames } from '../../../lib/utils/common'

type IconRendererProps = {
  existingInteraction?: Interaction
  selected?: Mood | null
  defaultIcon?: Mood | null
}
export const IconRenderer = ({
  existingInteraction,
  selected,
  defaultIcon,
}: IconRendererProps) => {
  if (existingInteraction && !selected) {
    return (
      <IconComponent
        mood={existingInteraction?.emoji}
        className={classNames(
          'h-4 w-4 flex-shrink-0 rounded-full',
          existingInteraction?.emoji.iconColor,
          existingInteraction?.emoji.bgColor,
        )}
      />
    )
  }
  if (selected) {
    return (
      <IconComponent
        mood={selected}
        className={classNames(
          'h-4 w-4 flex-shrink-0 rounded-full',
          selected.iconColor,
          selected.bgColor,
        )}
      />
    )
  }
  if (defaultIcon) {
    return (
      <IconComponent
        mood={defaultIcon}
        className="h-4 w-4 flex-shrink-0 text-gray-500"
      />
    )
  }
  return null
}
