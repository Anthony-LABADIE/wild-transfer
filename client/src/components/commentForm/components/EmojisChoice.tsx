import { useMutation, useQuery } from '@apollo/client'
import { Listbox, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

import { CREATE_INTERACTION } from '../../../graphql/mutations/interaction.mutations'
import { EMOJILIST } from '../../../graphql/queries/Emoji.queries'
import { GetInteractionByAuthorAndComment } from '../../../graphql/queries/Interaction.queries'
import { Interaction, Mood } from '../../../interfaces/interfaces'
import { classNames } from '../../../lib/utils/common'
import EmojiSum from './EmojiSum'
import { IconComponent } from './IconComponent'
import { IconRenderer } from './IconRenderer'

interface EmojiListProps {
  authorId: string
  commentId: string
}

const EmojisChoice = (props: EmojiListProps) => {
  const { commentId, authorId } = props
  const [createInteraction] = useMutation(CREATE_INTERACTION)
  const { data: moods } = useQuery(EMOJILIST)
  const { data: existingInteraction } = useQuery(
    GetInteractionByAuthorAndComment,
    { variables: { commentId, authorId } },
  )

  const [selected, setSelected] = React.useState<Mood | null>(null)

  const handleChange = (value: Mood) => {
    if (
      value?.id ||
      existingInteraction?.GetInteractionByAuthorIdAndCommentId?.emoji.id
    ) {
      createInteraction({
        variables: {
          interactionToCreate: {
            commentId,
            emojiId:
              value?.id ||
              existingInteraction?.GetInteractionByAuthorIdAndCommentId?.emoji
                .id,
            authorId,
          },
        },
        onCompleted() {
          setSelected(value)
        },
      })
    }
  }

  if (!moods) return null

  return (
    <>
      <div className="flex items-center my-1 py-3 w-5 h-5 border-2 justify-center px-4 rounded-md border border-gray-200">
        <Listbox value={selected} onChange={handleChange}>
          {({ open, value }) => (
            <>
              <Listbox.Label className="sr-only">Your mood</Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-white hover:text-gray-500">
                  <span className="flex items-center justify-center">
                    {IconRenderer({
                      existingInteraction:
                        existingInteraction?.GetInteractionByAuthorIdAndCommentId as Interaction,
                      selected: value as Mood,
                      defaultIcon: moods?.EmojiList[0] as Mood,
                    })}
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                    {moods?.EmojiList.map((mood: Mood) => (
                      <Listbox.Option
                        key={mood.name}
                        className={({ active }) =>
                          classNames(
                            active ? 'bg-gray-100' : 'bg-white',
                            'relative cursor-default select-none px-3 py-2',
                          )
                        }
                        value={mood}
                      >
                        {({ selected }) => (
                          <div className="flex items-center">
                            <div
                              className={classNames(
                                mood.bgColor,
                                'flex h-8 w-8 items-center justify-center rounded-full',
                                selected ? 'selected' : 'notselected',
                              )}
                            >
                              <IconComponent
                                mood={mood}
                                className={classNames(
                                  mood.iconColor,
                                  'h-5 w-5 flex-shrink-0',
                                )}
                              />
                            </div>
                            <span className="ml-3 block truncate font-medium">
                              {mood.name}
                            </span>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <EmojiSum commentId={commentId} selected={selected} />
    </>
  )
}

export default EmojisChoice
