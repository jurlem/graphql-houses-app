import { useState, useEffect } from "react";

export function useLocalState<S>(key: string, initial: S) {
  const [value, setValue] = useState<S>(() => {
    // we  want to know if we already have a key in localstorage, otherwise we initial 
    // first we are checking that we are running ia a client and not in server ( next specific)
    // and we know that we have access to localstorage
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = window.localStorage.getItem(key)
      if (saved) {
        return JSON.parse(saved)
      }
    }
    return initial
  })

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }, [value])
  return [value, setValue] as [typeof value, typeof setValue]
}

