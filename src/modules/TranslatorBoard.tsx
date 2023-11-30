import { ChangeEventHandler } from 'react'
import CheckBox from './CheckBox.tsx'
import TextArea from './TextArea.tsx'

export type TranslatorBoardProps = {
  headerText: string
  checkedValue: boolean
  onInputChange: ChangeEventHandler<HTMLTextAreaElement>
  onCheckBoxChange: () => void
  resultText: string
}

export default function TranslatorBoard({
  headerText,
  checkedValue,
  onInputChange,
  onCheckBoxChange,
  resultText,
}: TranslatorBoardProps) {
  return (
    <>
      <div className="my-6 text-center text-2xl font-semibold">
        {headerText}
      </div>
      <TextArea
        label="Your message"
        rows={4}
        placeholder="Write your message here..."
        // lets outside (App) access the entire event object
        onChange={onInputChange}
      />
      <CheckBox
        className="mb-5 mt-2"
        label="Caesar Cipher"
        onChange={onCheckBoxChange}
        checked={checkedValue}
      />
      <TextArea label="Result message" rows={4} value={resultText} disabled />
    </>
  )
}
