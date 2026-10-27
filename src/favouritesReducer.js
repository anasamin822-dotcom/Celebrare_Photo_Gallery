export const STORAGE_KEY = 'photo-gallery-favourites'

// Reads saved favourite ids from localStorage (empty list if nothing saved).
export function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

// One action only: TOGGLE_FAVOURITE adds the id if missing, removes it if present.
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    default:
      return state
  }
}
