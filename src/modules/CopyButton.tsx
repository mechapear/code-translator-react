import { CopyIcon } from './icon.tsx'

export type CopyButtonProps = {
  onClick: () => void
  text: string
}

export default function CopyButton({ onClick, text }: CopyButtonProps) {
  return (
    <>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center justify-center rounded text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        onClick={onClick}
      >
        <CopyIcon />
        <span className="pl-1 text-sm">{text}</span>
      </button>
    </>
  )
}
