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
      <div className="my-2 text-sm font-medium text-slate-900 dark:text-slate-200">
        {label}
      </div>
      <textarea
        className={cn(
          'block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          className,
        )}
        {...restProps}
      />
    </label>
  )
}
