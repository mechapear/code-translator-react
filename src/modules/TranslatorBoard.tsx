import { ChangeEventHandler } from 'react'
import Button from './Button.tsx'
import CheckBox from './CheckBox.tsx'
import TextArea from './TextArea.tsx'

export type TranslatorBoardProps = {
  headerText: string
  placeholderText: string
  checkedValue: boolean
  onInputChange: ChangeEventHandler<HTMLTextAreaElement>
  onCheckBoxChange: () => void
  resultText: string
  onButtonClick: () => void
  buttonText: string
}

export default function TranslatorBoard({
  headerText,
  placeholderText,
  checkedValue,
  onInputChange,
  onCheckBoxChange,
  resultText,
  onButtonClick,
  buttonText,
}: TranslatorBoardProps) {
  return (
    <>
      <div className="my-6 text-center text-2xl font-semibold">
        {headerText}
      </div>
      <TextArea
        label="Your message"
        rows={4}
        placeholder={placeholderText}
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
      <div className="my-1">
        <Button text={buttonText} onClick={onButtonClick} />
      </div>
    </>
  )
}
