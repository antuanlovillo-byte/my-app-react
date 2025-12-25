import React from 'react';
import { BookOpen, Home, MessageCircle, Settings } from 'lucide-react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { view: AppView.HOME, icon: Home, label: 'Inicio' },
    { view: AppView.LIBRARY, icon: BookOpen, label: 'Oraciones' },
    { view: AppView.CHAPLAIN, icon: MessageCircle, label: 'Asistente' },
    //{ view: AppView.SETTINGS, icon: Settings, label: 'Ajustes' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-church-200 shadow-lg pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-church-600' : 'text-church-300 hover:text-church-500'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs mt-1 font-medium ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;