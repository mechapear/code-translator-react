import { ComponentProps } from 'react'
import { cn } from './cn.ts'

// use all of input types except 'type' and 'className'
export type CheckBoxProps = Omit<
  ComponentProps<'input'>,
  'type' | 'className'
> & {
  // extends type
  className?: string
  label?: string
}

export default function CheckBox({
  className,
  label,
  ...restProps
}: CheckBoxProps) {
  return (
    <label
      // conditionally merge Tailwind CSS classes
      className={cn(
        'relative inline-flex cursor-pointer items-center',
        className,
      )}
    >
      <input className="peer sr-only" type="checkbox" {...restProps} />
      <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      {Boolean(label) && (
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  )
}
