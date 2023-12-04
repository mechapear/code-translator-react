import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { MORSE_CODE } from '../App.tsx'
import { debounce } from './debounce.ts'
import TranslatorBoard from './TranslatorBoard.tsx'

export function MorseCodeEncoder() {
  const [inputValue, setInputValue] = useState('')
  const [isCaesar, setIsCaesar] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const encodedText = isCaesar ? encodeCaesar(inputValue) : inputValue
  const resultEncodedText = encodeMorse(encodedText)

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value.toUpperCase())
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
    navigator.clipboard.writeText(resultEncodedText).then(
      () => {
        console.log('copied:', resultEncodedText)
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
      headerText="Encode Morse code"
      placeholderText="Write your message here..."
      inputValue={inputValue}
      checkedValue={isCaesar}
      onInputChange={handleInputChange}
      onCheckBoxChange={handleCheckBoxChange}
      resultText={resultEncodedText}
      onButtonClick={handleCopyToClipboard}
      buttonText={isCopied ? 'copied' : 'copy'}
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
