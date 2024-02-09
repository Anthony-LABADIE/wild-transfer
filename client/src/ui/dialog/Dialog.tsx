import { Transition } from '@headlessui/react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Fragment, PropsWithChildren, TransitionEventHandler } from 'react'
import React from 'react'

import { classMerge } from '../../lib/utils/common'

// import Icons from '../icons'

interface Props extends PropsWithChildren {
  isOpen: boolean
  title?: string
  description?: string
  onOpenChange: (isOpen: boolean) => void
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>
  className?: string
}

export const Dialog = ({
  isOpen,
  title,
  description,
  onOpenChange,
  children,
  onTransitionEnd,
  className,
}: Props) => {
  const handleOpenChange = (open: boolean) => {
    if (typeof onOpenChange === 'function') onOpenChange(open)
  }
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Transition.Root show={isOpen} onTransitionEnd={onTransitionEnd}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-30 bg-black/50"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            forceMount
            className={classMerge(
              'fixed z-50 bg-white',
              'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
              'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] focus:outline-none dark:border-[0.5px] dark:border-[#2F2F2F] dark:bg-[#191919]',
              className,
            )}
          >
            <div>
              {title && (
                <DialogPrimitive.Title className="text-sm font-medium text-[#3E414B] dark:text-[#EDEFF4]">
                  {title}
                </DialogPrimitive.Title>
              )}
              {description && (
                <DialogPrimitive.Description className="mt-2 text-sm font-normal text-[#3E414B] dark:text-[#EDEFF4]">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            <div className="mt-4">{children}</div>

            <DialogPrimitive.Close
              className={classMerge(
                'absolute right-3.5 top-3.5 inline-flex items-center justify-center rounded p-1',
                'focus-visible:ring-brand focus:outline-none focus-visible:ring',
              )}
            >
              {/* <Icons.x className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:hover:text-[#EDEFF4]" /> */}
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Root>
  )
}

export type DialogFormProps = {
  className?: string
  name?: string
  placeholder?: string
  type?: string
  defaultValue?: string
}

export const DialogForm: React.FC<DialogFormProps> = ({
  className,
  name,
  placeholder,
  type,
  defaultValue,
}) => {
  return (
    <>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label
          className="w-[90px] text-right text-[15px] text-[#3E414B] dark:text-[#EDEFF4]"
          htmlFor="name"
        >
          {name}
        </label>
        <input
          className={classMerge(
            className,
            'text-primary my-0 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg border-[#F6F6F7] bg-[#F6F6F7] px-[10px] text-[15px] placeholder:text-[14px] placeholder:text-[#B4B4B4] focus:border-[#8291C3] focus:ring-[1px] dark:border-[#2F2F2F] dark:bg-transparent dark:text-gray-100 dark:ring-offset-[#333537] dark:placeholder:text-gray-300 dark:focus:ring-[#8291c34d]',
          )}
          id="name"
          placeholder={placeholder}
          type={type}
          defaultValue={defaultValue}
        />
      </fieldset>
    </>
  )
}
DialogForm.displayName = 'DialogForm'

export const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Close
      className={classMerge(className)}
      {...props}
      ref={ref}
    >
      {children}
    </DialogPrimitive.Close>
  )
})
DialogClose.displayName = DialogPrimitive.Close.displayName
