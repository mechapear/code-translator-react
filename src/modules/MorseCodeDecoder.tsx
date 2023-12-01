import { ChangeEvent, useState } from 'react'
import { MORSE_CODE } from '../App.tsx'
import TranslatorBoard from './TranslatorBoard.tsx'

export default function MorseCodeDecoder() {
  const [inputValue, setInputValue] = useState('')
  const [isCaesar, setIsCaesar] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const decodedText = decodeMorse(inputValue)
  const resultDecodedText = isCaesar ? decodeCaesar(decodedText) : decodedText

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value)
  }

  function handleCheckBoxChange() {
    setIsCaesar((prevIsCaesar) => !prevIsCaesar)
  }

  function handleCopyToClipboard() {
    setIsCopied(true)
    // writeText(string) property writes the specified text string to the system clipboard
    navigator.clipboard.writeText(resultDecodedText).then(
      () => {
        console.log('copied:', resultDecodedText)
      },
      (error) => {
        // clipboard write failed
        console.error(error)
      },
    )
    // TODO: clear timeout before setting new timeout
    // reset isCopied to false after 1 second
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <TranslatorBoard
      headerText="Decode Morse code"
      placeholderText="Write your Morse code here..."
      inputValue={inputValue}
      checkedValue={isCaesar}
      onInputChange={handleInputChange}
      onCheckBoxChange={handleCheckBoxChange}
      resultText={resultDecodedText}
      onButtonClick={handleCopyToClipboard}
      buttonText={isCopied ? 'copied' : 'copy'}
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
