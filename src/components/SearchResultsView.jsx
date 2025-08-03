import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import { Building2 } from 'lucide-react';

const SearchResultsView = ({ searchResults, handleViewProperty, setCurrentView, setShowFilters }) => {
  return (
    <motion.div
      key="search"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text">ผลการค้นหา</h2>
          <p className="text-gray-600">พบทรัพย์ {searchResults.length} รายการ</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setCurrentView('home')}
        >
          กลับหน้าหลัก
        </Button>
      </div>

      {searchResults.length > 0 ? (
        <div className="property-grid">
          {searchResults.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <PropertyCard
                property={property}
                onView={handleViewProperty}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            ไม่พบทรัพย์ที่ตรงกับเงื่อนไข
          </h3>
          <p className="text-gray-500 mb-6">
            ลองปรับเงื่อนไขการค้นหาใหม่
          </p>
          <Button onClick={() => setShowFilters(true)}>
            ค้นหาใหม่
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchResultsView;