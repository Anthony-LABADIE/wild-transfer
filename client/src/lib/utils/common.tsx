import { ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const classMerge = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
export const formatDate = (date: string) => {
  const newDate = new Date(date)
  return format(newDate, 'd MMMM, yyyy')
}
export const formatTtile = (title: string) => {
  const newTitle = title.substring(14)
  return newTitle
}
