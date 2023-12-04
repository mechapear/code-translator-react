// eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
export function debounce<Fn extends (...args: any[]) => any>(
  fn: Fn,
  wait: number,
) {
  let timer: ReturnType<typeof setTimeout>

  function debounced(...params: Parameters<Fn>) {
    // cleat previous timout before setting a new one
    clearTimeout(timer)
    timer = setTimeout(() => fn(...params), wait)
  }

  debounced.cancel = () => clearTimeout(timer)

  return debounced
}
