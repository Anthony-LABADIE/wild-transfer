import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import cn from 'classnames'
import React, { ReactNode, RefObject, useEffect, useRef, useState } from 'react'

// Example usage:
// export const DropdownDefaultTest: Story = {
//   args: {
//     itemsButton: simpleLabel,
//   },
//   render: (args) => {
//     const classes = {
//       baseBtn:
//         'flex h-[34px] justify-between w-[55px] flex-row items-center rounded-[3px] hover:bg-[#F8F9F9] focus:border-solid focus:border-[#8291C3] focus:[box-shadow:inset_0px_0px_0px_2px_rgba(130,_145,_195,_0.3)] active:bg-[#CCD1E3] dark:bg-[#191919] dark:text-[#EDEFF4] dark:hover:bg-[#262626] dark:active:bg-[#3E414B]',
//       baseShortcutBtn:
//         'ml-auto mr-[12px] pl-[20px] text-right text-[12px] font-[500] not-italic leading-[18px] text-[#8B8B8B] dark:text-[#EDEFF4]',
//       baseLabelBtn:
//         'mx-[12px] text-[12px] font-[400] not-italic leading-[18px]',
//       baseLabelBtnCmd:
//         'mx-[12px] text-[12px] font-[500] not-italic leading-[18px] text-[#8B8B8B]',
//     }
//     const { itemsButton } = args

//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger className="rounded-[5px] w-8 flex justify-center items-center w-10 border-[0.5px] border-solid border-[#DFE1E4] bg-[#EDEFF4] p-0 text-[#3E414B] dark:border-[#292B2E] dark:bg-[#191919] dark:text-[#EDEFF4]">
//           <Icons.verticalPoint />
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           {itemsButton.map(({ value, label }, index) => (
//             <DropdownMenuItem key={index} className={classes.baseBtn}>
//               <DropdownMenuLabel className={classes.baseLabelBtn}>
//                 {value}
//               </DropdownMenuLabel>
//               <div className={classes.baseLabelBtnCmd}>{label}</div>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     )
//   },
// }

{
  /* <DropdownMenu>
  <DropdownMenuTrigger className="rounded-[5px] w-8 flex justify-center items-center w-10 border-[0.5px] border-solid border-[#DFE1E4] bg-[#EDEFF4] p-0 text-[#3E414B] dark:border-[#292B2E] dark:bg-[#191919] dark:text-[#EDEFF4]">
    <VerticalPoint2 />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem className="flex h-[34px] justify-between w-[55px] flex-row items-center rounded-[3px] hover:bg-[#F8F9F9] focus:border-solid focus:border-[#8291C3] focus:[box-shadow:inset_0px_0px_0px_2px_rgba(130,_145,_195,_0.3)] active:bg-[#CCD1E3] dark:bg-[#191919] dark:text-[#EDEFF4] dark:hover:bg-[#262626] dark:active:bg-[#3E414B]">
      <DropdownMenuLabel className="mx-[12px] text-[12px] font-[400] not-italic leading-[18px]">
        View
      </DropdownMenuLabel>
      <div className="mx-[12px] text-[12px] font-[500] not-italic leading-[18px] text-[#8B8B8B]" />
    </DropdownMenuItem>
    <DropdownMenuItem className="flex h-[34px] justify-between w-[55px] flex-row items-center rounded-[3px] hover:bg-[#F8F9F9] focus:border-solid focus:border-[#8291C3] focus:[box-shadow:inset_0px_0px_0px_2px_rgba(130,_145,_195,_0.3)] active:bg-[#CCD1E3] dark:bg-[#191919] dark:text-[#EDEFF4] dark:hover:bg-[#262626] dark:active:bg-[#3E414B]">
      <DropdownMenuLabel className="mx-[12px] text-[12px] font-[400] not-italic leading-[18px]">
        Edit
      </DropdownMenuLabel>
      <div className="mx-[12px] text-[12px] font-[500] not-italic leading-[18px] text-[#8B8B8B]" />
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> */
}

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ children, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      {...props}
      ref={ref}
      className={cn(
        'items-center space-x-[2px] hover:bg-gray-100',
        'dark:hover:bg-[#222325]',
        props.className,
      )}
    >
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
})
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      sideOffset={5}
      ref={ref}
      {...props}
      className={cn(
        props.className,
        'flex h-auto w-auto flex-col items-center rounded-[5px] border-solid',
        'border border-[#DFE1E4] bg-[#FFFFFF]',
        'dark:border-[2px] dark:border-[#292B2E] dark:bg-[#191919]',
      )}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Trigger
      {...props}
      ref={ref}
      className={cn(
        props.className,
        'flex items-center gap-2 px-2 py-[2px]',
        'hover:bg-gray-100 dark:border-[#292B2E] dark:hover:bg-[#222325] hover:dark:text-[#f2f1f1]',
      )}
    >
      {children}
    </DropdownMenuPrimitive.Trigger>
  )
})
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName

const DropdownSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn(
        'h-[1px] w-[270px] bg-[#DFE1E4]',
        'dark:bg-[#292B2E]',
        className,
      )}
      {...props}
    />
  )
})
DropdownSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuItem = DropdownMenuPrimitive.Item

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        'text-[12px] font-[400] not-italic leading-[18px]',
        className,
      )}
      {...props}
    />
  )
})
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

interface DropdownSelectWrapperProps {
  className?: string
  children: (
    selectRef: RefObject<HTMLButtonElement>,
    open: boolean,
  ) => ReactNode
}

const DropdownSelectWrapper = ({
  className,
  children,
}: DropdownSelectWrapperProps) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const selectRef = useRef<HTMLButtonElement>(null)

  const [open, setOpen] = useState(false)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setOpen(!open)
    }
  }

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.onfocus = () => {
        if (!open) itemRef.current?.focus()
      }
    }
  }, [open])

  return (
    <DropdownMenuItem
      ref={itemRef}
      className={className}
      onKeyDown={handleKeyDown}
    >
      {children(selectRef, open)}
    </DropdownMenuItem>
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownSelectWrapper,
  DropdownSeparator,
}
