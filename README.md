# Photo Gallery

React + Vite + Tailwind CSS photo gallery for the Celebrare pre-screening assignment.

- Fetches 30 photos from `https://picsum.photos/v2/list?limit=30` (spinner while loading, message on error)
- Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Live search by author (filters the already-fetched list, no extra API call)
- Favourites with `useReducer`, saved in `localStorage`
- `useFetchPhotos` custom hook, `useCallback` + `useMemo` in `Gallery`

## Run it

Needs Node.js 20.19+ (or 22+).

```
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

Production check: `npm run build` then `npm run preview`.

Planning notes are in `docs/`.
