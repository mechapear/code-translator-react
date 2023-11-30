import { ChangeEvent, useState } from 'react'
import { MORSE_CODE } from '../App.tsx'
import TranslatorBoard from './TranslatorBoard.tsx'

export default function MorseCodeDecoder() {
  const [input, setInput] = useState('')
  const [isCaesar, setIsCaesar] = useState(false)

  const decodedText = decodeMorse(input)
  const resultDecodedText = isCaesar ? decodeCaesar(decodedText) : decodedText

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setInput(event.target.value)
  }

  function handleCheckBoxChange() {
    setIsCaesar((prevIsCaesar) => !prevIsCaesar)
  }

  return (
    <TranslatorBoard
      headerText="Decode Morse code"
      checkedValue={isCaesar}
      onInputChange={handleInputChange}
      onCheckBoxChange={handleCheckBoxChange}
      resultText={resultDecodedText}
    />
  )
}

function decodeMorse(encodedString: string) {
  return encodedString
    .split(' ') // split the encodedString into array of encoded characters
    .map((encodedCharacter) => {
      // convert empty string to space character = space between words
      if (encodedCharacter === '') return ' '

      // get object key from value
      // Object.keys(obj).find(key => obj[key] === value)
      return Object.keys(MORSE_CODE).find(
        (key) => MORSE_CODE[key] === encodedCharacter,
      )
    })
    .join('')
}

function decodeCaesar(caesarText: string) {
  return caesarText
    .split('') // split caesarText into array of each character
    .map((caesarCharacter) => {
      if (caesarCharacter === ' ') return ' '
      // convert each caesarCharacter by the previous character
      // string.fromCharCode() converts Unicode values to characters
      return String.fromCharCode(caesarCharacter.charCodeAt(0) - 1)
    })
    .join('')
}
