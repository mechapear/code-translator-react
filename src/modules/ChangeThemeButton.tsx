import { ReactElement } from 'react'

export type ChangeThemeButtonProps = {
  onClick: () => void
  content: ReactElement
}

export default function ChangeThemeButton({
  onClick,
  content,
}: ChangeThemeButtonProps) {
  return (
    <div className="fixed right-5 top-5 duration-100">
      <button
        className="m-1 grid h-8 w-8 place-content-center rounded-full bg-slate-100 text-slate-900 shadow ring-1 ring-inset ring-black/10 dark:border-slate-400 dark:bg-slate-300 dark:text-slate-700"
        onClick={onClick}
      >
        {content}
      </button>
    </div>
  )
}
