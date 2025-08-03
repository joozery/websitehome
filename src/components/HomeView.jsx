import React from 'react';
import { motion } from 'framer-motion';
import {
  HeroSection,
  SearchSection,
  PropertiesSection,
  BlogSection
} from '@/components/sections';

const HomeView = ({ properties, availableProperties, handleViewProperty, setShowFilters }) => {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <HeroSection setShowFilters={setShowFilters} />
      <SearchSection setShowFilters={setShowFilters} />
      <PropertiesSection 
        availableProperties={availableProperties}
        handleViewProperty={handleViewProperty}
        setShowFilters={setShowFilters}
      />
      <BlogSection />
    </motion.div>
  );
};

export default HomeView;