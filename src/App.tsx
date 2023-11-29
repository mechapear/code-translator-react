import { ChangeEvent, useState } from 'react'
import CheckBox from './modules/CheckBox.tsx'
import TextArea from './modules/TextArea.tsx'

const MORSE_CODE: Record<string, string> = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  "'": '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  _: '..--.-',
  '"': '.-..-.',
  $: '...-..-',
  '@': '.--.-.',
}

export default function App() {
  const [input, setInput] = useState('')
  const [isCaesar, setIsCaesar] = useState(false)

  const decodedText = decodeMorse(input)
  const resultText = isCaesar ? decodeCaesar(decodedText) : decodedText

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setInput(event.target.value)
  }

  return (
    <>
      <div className="absolute left-1/2 top-1/2 min-w-[320px] -translate-x-1/2 -translate-y-1/2 md:min-w-[400px]">
        <TextArea
          label="Your message"
          rows={4}
          placeholder="Write your message here..."
          onChange={handleInputChange}
        />
        <CheckBox
          className="mb-6 mt-2"
          label="Caesar Cipher"
          onChange={() => setIsCaesar((prevIsCaesar) => !prevIsCaesar)}
          checked={isCaesar}
        />
        <TextArea label="Result message" rows={4} value={resultText} disabled />
      </div>
    </>
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

function encodeMorse(decodedString: string) {
  return decodedString
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
