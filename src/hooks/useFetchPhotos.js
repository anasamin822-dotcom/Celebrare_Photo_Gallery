import { useEffect, useState } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

// Fetches 30 photos once, when the component first loads.
// Returns: photos (array), loading (true while waiting), error (message or null).
export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPhotos() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data = await response.json()
        setPhotos(data)
        setError(null)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message || 'Something went wrong')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPhotos()
    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}
