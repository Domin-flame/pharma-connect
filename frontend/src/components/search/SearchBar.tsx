import { useMemo, type Dispatch, type SetStateAction } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
  onSearch: () => void
}

const mockSuggestions = [
  'Doliprane 1000mg',
  'Doliprane 500mg',
  'Amoxicilline 500mg',
  'Paracétamol 1000mg',
  'Ibuprofène 400mg'
]

export function SearchBar({
  searchQuery,
  setSearchQuery,
  onSearch
}: SearchBarProps) {
  const suggestions = useMemo(() => {
    if (searchQuery.length > 2) {
      return mockSuggestions.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return []
  }, [searchQuery])

  const showSuggestions = suggestions.length > 0

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSearch()}
        placeholder="Rechercher un médicament..."
        className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:border-emerald-500"
      />

      {showSuggestions && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => {
                setSearchQuery(s)
                onSearch()
              }}
              className="w-full px-4 py-3 text-left hover:bg-emerald-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}