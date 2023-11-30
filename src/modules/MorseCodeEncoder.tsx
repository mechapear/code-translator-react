import { ChangeEvent, useState } from 'react'
import { MORSE_CODE } from '../App.tsx'
import TranslatorBoard from './TranslatorBoard.tsx'

export function MorseCodeEncoder() {
  const [input, setInput] = useState('')
  const [isCaesar, setIsCaesar] = useState(false)

  const encodedText = isCaesar ? encodeCaesar(input) : input
  const resultEncodedText = encodeMorse(encodedText)

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setInput(event.target.value)
  }

  function handleCheckBoxChange() {
    setIsCaesar((prevIsCaesar) => !prevIsCaesar)
  }

  return (
    <TranslatorBoard
      headerText="Encode Morse code"
      checkedValue={isCaesar}
      onInputChange={handleInputChange}
      onCheckBoxChange={handleCheckBoxChange}
      resultText={resultEncodedText}
    />
  )
}

function encodeMorse(decodedString: string) {
  return decodedString
    .toUpperCase() // convert to uppercase for matching MORSE_CODE keys
    .split('') // split the decodedString into array of decoded characters
    .map((decodedCharacter) => {
      // convert to '' for not tripple space between words when joining
      if (decodedCharacter === ' ') return ''
      // get object value from key
      return MORSE_CODE[decodedCharacter]
    })
    .join(' ')
}

function encodeCaesar(decodedText: string) {
  return decodedText
    .split('') // split decodedText into array of each decoded character
    .map((decodedCharacter) => {
      if (decodedCharacter === ' ') return ' '
      // convert to caesar character by replacing with the next character
      // string.fromCharCode() converts Unicode values to characters
      return String.fromCharCode(decodedCharacter.charCodeAt(0) + 1)
    })
    .join('')
}
