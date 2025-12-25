import React, { useState } from 'react';
import { STATIC_PRAYERS } from '../constants';
import { Prayer, PrayerCategory } from '../types';
import PrayerCard from './PrayerCard';
import { Search, ChevronRight } from 'lucide-react';

const LibraryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PrayerCategory | 'Todas'>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePrayer, setActivePrayer] = useState<Prayer | null>(null);

  const categories = ['Todas', ...Object.values(PrayerCategory)];

  const filteredPrayers = STATIC_PRAYERS.filter(p => {
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 h-full flex flex-col bg-church-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm border-b border-church-100 sticky top-0 z-10">
        <h1 className="text-2xl font-serif font-bold text-church-800 mb-4">Oraciones</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar oración..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-church-50 border border-church-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-400 text-church-800 placeholder-church-400"
          />
          <Search className="absolute left-3 top-2.5 text-church-400" size={18} />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-church-700 text-white'
                  : 'bg-church-100 text-church-600 hover:bg-church-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="space-y-3">
          {filteredPrayers.length > 0 ? (
            filteredPrayers.map((prayer) => (
              <button
                key={prayer.id}
                onClick={() => setActivePrayer(prayer)}
                className="w-full bg-white p-4 rounded-xl border border-church-100 shadow-sm hover:shadow-md transition flex items-center justify-between group text-left"
              >
                <div>
                  <h3 className="font-serif font-semibold text-church-800 group-hover:text-church-600 transition">
                    {prayer.title}
                  </h3>
                  <p className="text-xs text-church-400 mt-1 uppercase tracking-wide">
                    {prayer.category} {prayer.isNovena && '• Novena'}
                  </p>
                </div>
                <ChevronRight className="text-church-300 group-hover:text-church-500" size={20} />
              </button>
            ))
          ) : (
            <div className="text-center py-10 text-church-400">
              <p>No se encontraron oraciones.</p>
            </div>
          )}
        </div>
      </div>

      {activePrayer && (
        <PrayerCard prayer={activePrayer} onClose={() => setActivePrayer(null)} />
      )}
    </div>
  );
};

export default LibraryView;