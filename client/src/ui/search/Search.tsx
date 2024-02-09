import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import cn from 'classnames'
import { FC, InputHTMLAttributes } from 'react'

export interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Allows adding classes to the container
   */
  className?: string
  /**
   * Size of button
   */
  size?: 'large' | 'medium' | 'small'
}
const classes = {
  small: 'w-[200px]',
  medium: 'w-[327px]',
  large: 'w-[500px]',
}
/**
 * 
 * @param props 
 * @returns 
 * @example
 * import Search from '@/ui/search';
export default function Home() {
    return (
        <div>
            <Search size="medium">Search</Search>
        </div>
    );
}

 */
export const Search: FC<SearchProps> = (props) => {
  const { className, size = 'medium', children, ...rest } = props
  const classesName = cn(
    {
      [classes.small]: size === 'small',
      [classes.medium]: size === 'medium',
      [classes.large]: size === 'large',
    },
    className,
  )

  return (
    <div className={classesName}>
      <label
        htmlFor="search"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {children}
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FDECE0] sm:text-sm sm:leading-6"
          {...rest}
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </kbd>
        </div>
      </div>
    </div>
  )
}

export default Search
