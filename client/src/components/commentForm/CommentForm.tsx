import { PaperClipIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import React, { ChangeEvent, FormEvent } from 'react'

import { Comment } from '../../interfaces/interfaces'
import { formatDate } from '../../lib/utils/common'
import EmojisChoice from './components/EmojisChoice'

interface CommentFormProps {
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleChangeComment: (e: ChangeEvent<HTMLTextAreaElement>) => void
  filteredComments: Comment[]
}

const CommentForm: React.FC<CommentFormProps> = ({
  handleFormSubmit,
  filteredComments,
  handleChangeComment,
}) => {
  // Tri des commentaires par date de création (du moins récent au plus récent)
  const sortedComments = [...filteredComments].sort(
    (a: Comment, b: Comment) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    },
  )
  return (
    <div>
      <h2 className="text-sm font-semibold leading-6 text-gray-900">
        Activity
      </h2>
      <ul role="list" className="mt-6 space-y-6">
        {sortedComments.map(
          (activityItem: Comment, activityItemIdx: number) => (
            <li key={activityItem.id} className="relative flex gap-x-4">
              <div
                className={classNames(
                  activityItemIdx === filteredComments.length - 1
                    ? 'h-6'
                    : '-bottom-6',
                  'absolute left-0 top-0 flex w-6 justify-center',
                )}
              >
                <div className="w-px bg-gray-200" />
              </div>
              {activityItem.content ? (
                <>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-400 ring-1 ring-gray-300" />
                  </div>
                  <div>
                    <div className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                      <span className="font-medium text-gray-900">
                        {activityItem.author.username && (
                          <span className="font-medium text-gray-900">
                            {activityItem.author.username}
                          </span>
                        )}
                      </span>{' '}
                      à commenté :
                    </div>
                    <div>{activityItem.content}</div>
                    <div className="flex h-5 w-5 items-center mt-2">
                      <EmojisChoice
                        authorId={activityItem.author.id}
                        commentId={activityItem.id}
                      />
                    </div>
                  </div>
                  <time className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                    le {formatDate(activityItem.createdAt)}
                  </time>
                </>
              ) : (
                <>
                  <img
                    src={`https://example.com/images/${activityItem.author.username}.jpg`}
                    alt=""
                    className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                  />
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">
                          {activityItem.author.username}
                        </span>{' '}
                        created a new comment
                      </div>
                      <time
                        dateTime={new Date().toISOString()}
                        className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                      >
                        Just now
                      </time>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">
                      {activityItem.content}
                    </p>
                  </div>
                </>
              )}
            </li>
          ),
        )}
      </ul>
      <div className="mt-6 flex gap-x-3">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          className="h-6 w-6 flex-none rounded-full bg-gray-50"
        />
        <form
          onSubmit={handleFormSubmit}
          action="#"
          className="relative flex-auto"
        >
          <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Ajouter un commentaire
            </label>
            <textarea
              rows={2}
              name="comment"
              id="comment"
              className="block p-2 w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Ajouter un commentaire"
              defaultValue={''}
              onChange={handleChangeComment}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <button
                  type="button"
                  className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                >
                  <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Attach a file</span>
                </button>
              </div>
            </div>
            <button className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommentForm
