/** POSTs JSON to one of our API routes. Resolves to an error message, or null on success. */
export async function postForm(url: string, body: unknown): Promise<string | null> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) return null
    const data = await res.json().catch(() => ({}))
    return data.error ?? 'Something went wrong. Please try again.'
  } catch {
    return 'Could not reach the server. Please check your connection and try again.'
  }
}
