import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import SearchFilters from '@/components/SearchFilters';
import PropertyDetails from '@/components/PropertyDetails';

export const SearchFiltersModal = ({ show, onClose, onSearch }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold gradient-text">ค้นหาทรัพย์</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <span className="sr-only">ปิด</span>
                ✕
              </Button>
            </div>
            <SearchFilters onSearch={onSearch} />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const PropertyDetailsModal = ({ property, onClose, nearbyProperties }) => (
  <AnimatePresence>
    {property && (
      <PropertyDetails
        property={property}
        onClose={onClose}
        nearbyProperties={nearbyProperties}
      />
    )}
  </AnimatePresence>
);