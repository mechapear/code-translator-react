import React, { useState } from 'react'

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
  const [text, setText] = useState('')

  function handleTextInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value)
  }

  function handleCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const code = event.target.value
    console.log(`> code: `, code)
    const translatedText = morseToAlphabet(code)
    console.log(`> translatedText: `, translatedText)
    setText(translatedText)
  }

  return (
    <>
      <div>
        <label>
          Code
          <input
            type="textarea"
            className="border"
            onChange={handleCodeChange}
          />
        </label>
        <label>
          Text
          <input
            type="textarea"
            className="border"
            value={text}
            onChange={handleTextInputChange}
          />
        </label>
      </div>
    </>
  )
}

function morseToAlphabet(code: string) {
  if (code === '') return ''

  // split the code into array of code of each character
  const characters = code.split(' ')
  console.log(`> characters: `, characters)

  // convert code into each alphabet character
  const alphabets = characters.map((character) => {
    // convert empty string to space character = space between words
    if (character === '') return ' '

    // get object key from value
    // Object.keys(obj).find(key => obj[key] === value)
    const alphabet = Object.keys(MORSE_CODE).find(
      (key) => MORSE_CODE[key] === character,
    )
    return alphabet
  })

  return alphabets.join('')
}
