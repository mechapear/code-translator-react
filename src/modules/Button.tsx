import { CopyIcon } from './icon.tsx'

export type ButtonProps = {
  onClick: () => void
  text: string
}

export default function Button({ onClick, text }: ButtonProps) {
  return (
    <>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center justify-center rounded text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        onClick={onClick}
      >
        <CopyIcon />
        <span className="pl-1 text-sm">{text}</span>
      </button>
    </>
  )
}
