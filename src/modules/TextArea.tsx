import { ComponentProps } from 'react'
import { cn } from './cn.ts'

export type TextAreaProps = Omit<ComponentProps<'textarea'>, 'className'> & {
  className?: string
  label?: string
}

export default function TextArea({
  className,
  label,
  ...restProps
}: TextAreaProps) {
  return (
    <label>
      <div className="my-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </div>
      <textarea
        className={cn(
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          className,
        )}
        {...restProps}
      />
    </label>
  )
}
