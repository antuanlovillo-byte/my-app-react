import React, { useEffect, useState } from 'react';
import { generateDailyReflection } from '../services/geminiService';
import { Sparkles, Sun, ChevronRight } from 'lucide-react';
import { AppView } from '../types';

interface HomeViewProps {
    onChangeView: (view: AppView) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onChangeView }) => {
  const [reflection, setReflection] = useState<{ title: string; content: string; quote: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReflection = async () => {
      // In a real app, we might cache this by date in localStorage to save API calls
      const data = await generateDailyReflection();
      setReflection(data);
      setLoading(false);
    };
    fetchReflection();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-church-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-church-700 to-church-900 text-white p-8 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Sun size={120} />
        </div>
        <div className="relative z-10">
            <h1 className="text-3xl font-serif font-bold mb-2">Paz y Bien</h1>
            <p className="text-church-200 text-sm opacity-90">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-20">
        {/* Daily Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-church-100 mb-6">
          <div className="flex items-center gap-2 mb-4 text-gold-600">
            <Sparkles size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Reflexión del Día</span>
          </div>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-church-100 rounded w-3/4"></div>
              <div className="h-4 bg-church-100 rounded w-full"></div>
              <div className="h-4 bg-church-100 rounded w-full"></div>
              <div className="h-4 bg-church-100 rounded w-5/6"></div>
            </div>
          ) : reflection ? (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif text-church-800 mb-3">{reflection.title}</h2>
              <blockquote className="border-l-4 border-gold-400 pl-4 italic text-church-500 text-sm mb-4 bg-church-50 py-2 pr-2 rounded-r">
                "{reflection.quote}"
              </blockquote>
              <p className="text-church-600 leading-relaxed text-justify mb-4">
                {reflection.content}
              </p>
            </div>
          ) : (
            <p className="text-church-400">No se pudo cargar la reflexión.</p>
          )}
        </div>

        {/* Quick Actions */}
        <h3 className="text-lg font-bold text-church-800 mb-3 px-1">Acceso Rápido</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <button 
                onClick={() => onChangeView(AppView.LIBRARY)}
                className="bg-white p-4 rounded-xl shadow-sm border border-church-100 hover:border-church-300 transition flex flex-col items-center text-center gap-2 group"
            >
                <div className="bg-blue-50 text-blue-600 p-3 rounded-full group-hover:bg-blue-100 transition">
                    <Sun size={24} />
                </div>
                <span className="font-medium text-church-700">Rezo de Hoy</span>
            </button>
            <button 
                onClick={() => onChangeView(AppView.CHAPLAIN)}
                className="bg-white p-4 rounded-xl shadow-sm border border-church-100 hover:border-church-300 transition flex flex-col items-center text-center gap-2 group"
            >
                <div className="bg-gold-50 text-gold-600 p-3 rounded-full group-hover:bg-gold-100 transition">
                    <Sparkles size={24} />
                </div>
                <span className="font-medium text-church-700">Pedir Oración</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;