import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HomeView from '@/components/HomeView';
import SearchResultsView from '@/components/SearchResultsView';
import AdminPanel from '@/components/AdminPanel';
import Footer from '@/components/Footer';
import { SearchFiltersModal, PropertyDetailsModal } from '@/components/Modals';
import { useProperties } from '@/hooks/useLocalStorage';
import { toast } from '@/components/ui/use-toast';
import { samplePropertiesData } from '@/data/sampleData.js';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    searchProperties,
    getNearbyProperties,
    setProperties
  } = useProperties();

  useEffect(() => {
    if (properties.length === 0) {
      setProperties(samplePropertiesData);
    }
  }, []);

  const handleSearch = (filters) => {
    const results = searchProperties(filters);
    setSearchResults(results);
    setCurrentView('search');
    setShowFilters(false);
    
    toast({
      title: "ค้นหาเสร็จสิ้น!",
      description: `พบทรัพย์ ${results.length} รายการ`
    });
  };

  const handleViewProperty = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  const toggleAdmin = () => {
    if (!isAdmin) {
      const password = prompt('กรุณาใส่รหัสผ่านแอดมิน: (admin123)');
      if (password === 'admin123') {
        setIsAdmin(true);
        setCurrentView('admin');
        toast({
          title: "เข้าสู่ระบบแอดมินสำเร็จ!",
          description: "ยินดีต้อนรับสู่แผงควบคุมแอดมิน"
        });
      } else if (password) {
        toast({
          title: "รหัสผ่านไม่ถูกต้อง!",
          description: "กรุณาลองใหม่อีกครั้ง"
        });
      }
    } else {
      setIsAdmin(false);
      setCurrentView('home');
      toast({
        title: "ออกจากระบบแอดมินแล้ว"
      });
    }
  };

  const availableProperties = properties.filter(p => p.status === 'available');

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            properties={properties}
            availableProperties={availableProperties}
            handleViewProperty={handleViewProperty}
            setShowFilters={setShowFilters}
          />
        );
      case 'search':
        return (
          <SearchResultsView
            searchResults={searchResults}
            handleViewProperty={handleViewProperty}
            setCurrentView={setCurrentView}
            setShowFilters={setShowFilters}
          />
        );
      case 'admin':
        if (isAdmin) {
          return (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AdminPanel
                properties={properties}
                onAddProperty={addProperty}
                onUpdateProperty={updateProperty}
                onDeleteProperty={deleteProperty}
              />
            </motion.div>
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>PropertyHub - ค้นหาที่พักและทรัพย์เช่าคุณภาพ</title>
        <meta name="description" content="แพลตฟอร์มค้นหาอสังหาริมทรัพย์ที่ดีที่สุด พบคอนโด อพาร์ทเมนท์ บ้านเช่า และทรัพย์เช่าคุณภาพในทำเลดี" />
      </Helmet>

      <Navbar 
        setShowFilters={setShowFilters}
      />

      <main className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <SearchFiltersModal
        show={showFilters}
        onClose={() => setShowFilters(false)}
        onSearch={handleSearch}
      />

      <PropertyDetailsModal
        property={selectedProperty}
        onClose={handleCloseDetails}
        nearbyProperties={selectedProperty ? getNearbyProperties(selectedProperty) : []}
      />

      {isAdmin && (
        <Button
          className="floating-action"
          onClick={() => setCurrentView('admin')}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      <Toaster />
      
      {/* Footer - Only show on home and search pages */}
      {currentView !== 'admin' && <Footer />}
    </div>
  );
}

export default App;