import React from 'react';
import { Prayer } from '../types';
import { X, Share2, Heart } from 'lucide-react';

interface PrayerCardProps {
  prayer: Prayer;
  onClose: () => void;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ prayer, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-church-50 p-4 flex justify-between items-center border-b border-church-100">
          <div>
            <span className="text-xs font-bold tracking-wider text-church-400 uppercase">{prayer.category}</span>
            <h2 className="text-xl font-bold text-church-800">{prayer.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-church-400 hover:text-church-800 rounded-full hover:bg-church-200 transition">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-white">
            {prayer.duration && (
                <div className="mb-4 inline-block px-3 py-1 bg-gold-500/10 text-gold-600 rounded-full text-sm font-medium">
                    Duración sugerida: {prayer.duration}
                </div>
            )}
          <p className="font-serif text-lg leading-loose text-church-900 whitespace-pre-line text-justify">
            {prayer.content}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-church-100 flex justify-between bg-church-50">
            <button className="flex items-center gap-2 text-church-500 hover:text-rose-600 transition">
                <Heart size={20} />
                <span className="text-sm">Guardar</span>
            </button>
            <button className="flex items-center gap-2 text-church-500 hover:text-church-800 transition">
                <Share2 size={20} />
                <span className="text-sm">Compartir</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default PrayerCard;