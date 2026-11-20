'use client'

import { useCallback, useEffect, useState } from 'react'

// Keeps a form's half-typed values in sessionStorage, so closing a dialog by
// accident (Esc, a tap outside, a back gesture) doesn't throw them away.
// Storage can be missing or blocked (private windows, previews), so every read
// and write is guarded: the form still works, it just starts blank.

const PREFIX = 'screensage:draft:'

function readDraft<T extends object>(key: string, initial: T): T {
  try {
    const raw = window.sessionStorage.getItem(PREFIX + key)
    if (!raw) return initial
    const saved: unknown = JSON.parse(raw)
    if (!saved || typeof saved !== 'object') return initial
    // Only keep known keys whose saved value has the same type as the initial one.
    const merged = { ...initial }
    for (const k of Object.keys(initial) as (keyof T)[]) {
      const value = (saved as Record<string, unknown>)[k as string]
      const expected = initial[k]
      if (value !== undefined && (typeof value === typeof expected || expected === null)) merged[k] = value as T[keyof T]
    }
    return merged
  } catch {
    return initial
  }
}

/**
 * useState that survives the form unmounting. Call `clearDraft()` once the
 * form has been sent. Only mount this in client-rendered UI (it reads storage
 * on first render), e.g. inside a dialog.
 */
export function useFormDraft<T extends object>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readDraft(key, initial))

  useEffect(() => {
    try {
      window.sessionStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
      // Storage unavailable — the draft just won't survive a close.
    }
  }, [key, value])

  const clearDraft = useCallback(() => {
    try {
      window.sessionStorage.removeItem(PREFIX + key)
    } catch {
      // Nothing to clear.
    }
  }, [key])

  return [value, setValue, clearDraft] as const
}
