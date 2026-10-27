import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos.js'
import {
  favouritesReducer,
  loadFavourites,
  STORAGE_KEY,
} from '../favouritesReducer.js'
import PhotoCard from './PhotoCard.jsx'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    loadFavourites,
  )

  // Save favourites to localStorage every time they change.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  // useCallback: React keeps the same function (same identity) between renders
  // as long as its dependencies do not change.
  const handleSearch = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  const toggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }, [])

  // useMemo: filtering reruns only when photos or query change (not on a heart click).
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase()
    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, query])

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      <header className="mx-auto max-w-[1500px] px-5 pt-10 pb-6 sm:px-10 sm:pt-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Photo Gallery
            </h1>
            {!loading && !error && (
              <p className="mt-2 text-sm text-stone-500">
                {filteredPhotos.length} {filteredPhotos.length === 1 ? "photo" : "photos"} &middot; {favourites.length} {favourites.length === 1 ? "favourite" : "favourites"}
              </p>
            )}
          </div>
          <div className="w-full sm:w-80">
            <label htmlFor="search" className="sr-only">
              Search photos by author
            </label>
            <input
              id="search"
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search by author"
              className="w-full border-b border-stone-300 bg-transparent py-2 text-base text-stone-900 placeholder-stone-400 transition focus:border-stone-900 focus:outline-none"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-5 pb-20 sm:px-10">
        {loading && (
          <div className="flex flex-col items-center gap-4 py-24" role="status">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900" />
            <p className="text-stone-500">Loading photos...</p>
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mx-auto max-w-md border border-rose-300 bg-rose-50 px-5 py-4 text-center text-rose-800"
          >
            Could not load photos: {error}
          </p>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="py-16 text-center text-stone-500">
            No photos match "{query}".
          </p>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggle={toggleFavourite}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
