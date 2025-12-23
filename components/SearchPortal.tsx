
import React, { useState, useEffect, useCallback } from 'react';
import { geminiService } from '../services/geminiService';
import { GroundingChunk } from '../types';

interface SearchPortalProps {
  initialQuery?: string | null;
  onConsumed?: () => void;
}

const SearchPortal: React.FC<SearchPortalProps> = ({ initialQuery, onConsumed }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string, sources: GroundingChunk[] } | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const data = await geminiService.searchAnalysis(searchQuery);
      setResult(data as { text: string; sources: GroundingChunk[] });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
    setQuery('');
  };

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      performSearch(initialQuery);
      onConsumed?.();
    }
  }, [initialQuery, performSearch, onConsumed]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-3xl font-bold mb-2">Portail de Recherche Post-Quantique</h2>
        <p className="text-gray-400">Informations vérifiées propulsées par Google Search.</p>
      </header>

      <form onSubmit={handleSearch} className="relative max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ex: 'Dernières percées en cryptographie par réseaux'..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-colors font-bold"
        >
          {loading ? 'Recherche...' : 'Explorer'}
        </button>
      </form>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass p-8 rounded-2xl whitespace-pre-wrap leading-relaxed text-gray-200 prose prose-invert max-w-none">
            {result.text}
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Sources Vérifiées</h3>
            <div className="space-y-3">
              {result.sources.length > 0 ? result.sources.map((src, i) => (
                src.web && (
                  <a
                    key={i}
                    href={src.web.uri || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl border border-white/10 hover:bg-white/5 hover:border-blue-500 transition-all"
                  >
                    <p className="text-sm font-bold truncate mb-1">{src.web.title || 'Source'}</p>
                    <p className="text-xs text-blue-400 truncate">{src.web.uri || 'URL non disponible'}</p>
                  </a>
                )
              )) : (
                <p className="text-sm text-gray-500">Aucun lien externe trouvé pour cette requête.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPortal;
