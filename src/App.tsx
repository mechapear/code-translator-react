import { ChangeEvent, useState } from 'react'

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
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={4}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Write your message here..."
          onChange={handleInputChange}
        />

        <label className="relative mb-6 mt-2 inline-flex cursor-pointer items-center">
          <input
            className="peer sr-only"
            type="checkbox"
            onChange={() => setIsCaesar((prevIsCaesar) => !prevIsCaesar)}
            checked={isCaesar}
          />
          <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Caesar Cipher
          </span>
        </label>

        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Result message
        </label>
        <textarea
          id="message"
          rows={4}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          value={resultText}
          disabled
        />
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
