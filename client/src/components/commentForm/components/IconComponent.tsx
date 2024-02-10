import * as Icons from '@heroicons/react/20/solid'

import { Mood } from '../../../interfaces/interfaces'

type IconComponentProps = {
  mood: Partial<Mood>
  className: string
}
export const IconComponent = (props: IconComponentProps) => {
  const Icon = Icons[props.mood.iconName as keyof typeof Icons]
  return <Icon className={props.className} aria-hidden="true" />
}
