import { useEffect, useRef } from 'react'
import ChangeThemeButton from './modules/ChangeThemeButton.tsx'
import { MoonIcon, SunIcon } from './modules/icon.tsx'
import MorseCodeDecoder from './modules/MorseCodeDecoder.tsx'
import { MorseCodeEncoder } from './modules/MorseCodeEncoder.tsx'
import { useLocalStorageState } from './modules/useLocalStorageState.ts'

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
  const [isDarkMode, setIsDarkMode] = useLocalStorageState('isDarkMode', false)
  const hasInitializedRef = useRef(false)

  useEffect(() => {
    // Sync the UI with the state from localStorage for the first render
    // set init theme that the user has already set a theme preference
    if (!hasInitializedRef.current) {
      setDarkModeToRoot(isDarkMode)
      hasInitializedRef.current = true
    }
  }, [isDarkMode])

  function handleChangeTheme() {
    setIsDarkMode((prevIsDarkMode) => {
      const nextIsDarkMode = !prevIsDarkMode
      // set the dark mode class to the root element
      setDarkModeToRoot(nextIsDarkMode)
      return nextIsDarkMode
    })
  }

  return (
    <>
      <div>
        <ChangeThemeButton
          onClick={handleChangeTheme}
          content={isDarkMode ? <SunIcon /> : <MoonIcon />}
        />
      </div>
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

function setDarkModeToRoot(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
