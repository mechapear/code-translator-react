import MorseCodeDecoder from './modules/MorseCodeDecoder.tsx'
import { MorseCodeEncoder } from './modules/MorseCodeEncoder.tsx'

export const MORSE_CODE: Record<string, string> = {
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
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center pb-10 md:flex-row">
        <div className="m-5 min-w-[18rem] md:m-10 md:min-w-[22rem]">
          <MorseCodeDecoder />
        </div>
        <div className="m-5 min-w-[18rem] md:m-10 md:min-w-[22rem]">
          <MorseCodeEncoder />
        </div>
      </div>
    </>
  )
}
