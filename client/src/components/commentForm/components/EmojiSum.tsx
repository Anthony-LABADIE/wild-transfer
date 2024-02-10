import { useLazyQuery } from '@apollo/client'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

import { EMOJISBYCOMMENT } from '../../../graphql/queries/Emoji.queries'
import { InteractionResponse, Mood } from '../../../interfaces/interfaces'
import { classNames } from '../../../lib/utils/common'
import iconFilter from '../../../lib/utils/iconsFilter'
import { IconComponent } from './IconComponent'

type EmojiSumProps = {
  commentId?: string
  selected?: Mood | null
}
const EmojiSum = (props: EmojiSumProps) => {
  const [emojisList, setEmojisList] = useState<Mood[]>([])

  const [getEmojisByComment, { data: emojis }] = useLazyQuery(EMOJISBYCOMMENT, {
    variables: { commentId: props.commentId },
    onCompleted(data) {
      setEmojisList(iconFilter(data?.GetInteractionByCommentId))
    },
  })
  const emojisUnNeutral = emojis?.GetInteractionByCommentId.filter(
    (interaction: InteractionResponse) =>
      interaction.emoji.iconName !== 'FaceSmileIcon',
  )

  useEffect(() => {
    getEmojisByComment()
  }, [props.selected])

  if (emojisUnNeutral && emojisUnNeutral.length === 0) return null

  return (
    <div className="flex items-center my-1 h-5 py-3 border-2 justify-center px-5 rounded-md border border-gray-200">
      <Listbox>
        {({ open }) => (
          <>
            <Listbox.Label className="sr-only">Emojis Summary</Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative -m-2.5 flex h-10   items-center justify-center rounded-full text-white hover:text-gray-500">
                <div className="flex items-center  justify-start text-black gap-1">
                  <div>{emojisUnNeutral && emojisUnNeutral.length}</div>
                  <div className="flex items-center justify-start  h-10 ">
                    {emojisList &&
                      emojisList?.slice(0, 2).map((emoji) => {
                        return (
                          <IconComponent
                            mood={emoji}
                            className={classNames(
                              emoji.bgColor,
                              emoji.iconColor,
                              'h-5 w-5 -mx-[3px] flex-shrink-0 rounded-full border-2 border-white',
                            )}
                          />
                        )
                      })}
                  </div>
                </div>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                  {emojis &&
                    emojis?.GetInteractionByCommentId.map(
                      (interaction: InteractionResponse) => (
                        <Listbox.Option
                          key={interaction.id}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-gray-100' : 'bg-white',
                              'relative cursor-default select-none px-3 py-2',
                            )
                          }
                          value={interaction.emoji}
                        >
                          {({ selected }) => (
                            <div className="flex items-center">
                              <div
                                className={classNames(
                                  interaction.emoji.bgColor,
                                  'flex h-5 w-5 items-center justify-center rounded-full',
                                  selected ? 'selected' : 'notselected',
                                )}
                              >
                                <IconComponent
                                  mood={interaction.emoji}
                                  className={classNames(
                                    interaction.emoji.iconColor,
                                    'h-5 w-5 flex-shrink-0',
                                  )}
                                />
                              </div>
                              <span className="ml-3 block truncate capitalize font-medium">
                                {interaction.author.username}
                              </span>
                            </div>
                          )}
                        </Listbox.Option>
                      ),
                    )}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}

export default EmojiSum
