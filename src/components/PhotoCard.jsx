export default function PhotoCard({ photo, isFavourite, onToggle }) {
  // Smaller image than the original, so the grid loads fast.
  const src = `https://picsum.photos/id/${photo.id}/800/1000`

  return (
    <li className="group">
      <div className="aspect-[4/5] overflow-hidden bg-stone-200">
        <img
          src={src}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="truncate font-serif text-lg">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="rounded-full p-1.5 transition hover:bg-stone-200 focus:ring-2 focus:ring-stone-900 focus:outline-none"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 transition ${
              isFavourite
                ? 'scale-110 fill-rose-500 stroke-rose-500'
                : 'fill-none stroke-stone-500'
            }`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>
    </li>
  )
}
