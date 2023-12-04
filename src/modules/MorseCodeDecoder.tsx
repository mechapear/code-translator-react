import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { MORSE_CODE } from '../App.tsx'
import { debounce } from './debounce.ts'
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

  // chace the debounced function so that it is not recreated on every render
  // set isCopied after 1 second
  const debouncedSetIsCopied = useMemo(() => debounce(setIsCopied, 1000), [])

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
    // set isCopied to false after 1 second
    debouncedSetIsCopied(false)
  }

  // clear timeout when debouncedSetIsCopied is changed & component is unmounted
  useEffect(() => {
    return () => debouncedSetIsCopied.cancel()
  }, [debouncedSetIsCopied])

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
