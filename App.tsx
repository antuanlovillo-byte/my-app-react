import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';
import LibraryView from './components/LibraryView';
import AIChaplain from './components/AIChaplain';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomeView onChangeView={setCurrentView} />;
      case AppView.LIBRARY:
        return <LibraryView />;
      case AppView.CHAPLAIN:
        return <AIChaplain />;
      case AppView.SETTINGS:
        return <div className="p-8 text-center text-church-500">Configuración (Próximamente)</div>;
      default:
        return <HomeView onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="h-screen w-full flex justify-center bg-church-200 font-sans">
      <div className="w-full max-w-md bg-church-50 h-full flex flex-col relative shadow-2xl overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
            {renderView()}
        </div>
        
        {/* Bottom Navigation */}
        <Navigation currentView={currentView} setView={setCurrentView} />
      </div>
    </div>
  );
};

export default App;