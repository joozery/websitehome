import React from 'react';
import { motion } from 'framer-motion';
import SearchFilters from '@/components/SearchFilters';

const SearchSection = ({ setShowFilters }) => {
  const handleSearch = (filters) => {
    // เปิด modal filters
    setShowFilters(true);
  };

  return (
    <section className="py-12 bg-white">
      <div className="w-full max-w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SearchFilters 
            onSearch={handleSearch}
            onFilterChange={() => {}}
            filters={{}}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SearchSection; 