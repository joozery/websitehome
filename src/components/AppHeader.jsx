import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  Settings, 
  Building2
} from 'lucide-react';

const AppHeader = ({ currentView, setCurrentView, isAdmin, toggleAdmin, setShowFilters }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold gradient-text">PropertyHub</span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant={currentView === 'home' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('home')}
              className="hidden sm:flex"
            >
              <Home className="h-4 w-4 mr-2" />
              หน้าหลัก
            </Button>

            <Button
              variant="ghost"
              onClick={() => setShowFilters(true)}
              className="hidden sm:flex"
            >
              <Search className="h-4 w-4 mr-2" />
              ค้นหา
            </Button>

            <Button
              variant={isAdmin ? 'default' : 'ghost'}
              onClick={toggleAdmin}
              className="hidden sm:flex"
            >
              <Settings className="h-4 w-4 mr-2" />
              {isAdmin ? 'แอดมิน' : 'เข้าสู่ระบบ'}
            </Button>

            <div className="flex sm:hidden gap-2">
              <Button size="icon" variant="ghost" onClick={() => setCurrentView('home')}>
                <Home className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setShowFilters(true)}>
                <Search className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={toggleAdmin}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppHeader;