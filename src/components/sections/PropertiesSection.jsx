import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';

const PropertiesSection = ({ availableProperties, handleViewProperty, setShowFilters }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);
  const scrollContainerRef = useRef(null);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) { // sm
        setItemsPerView(1);
      } else if (window.innerWidth < 768) { // md
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) { // lg
        setItemsPerView(3);
      } else if (window.innerWidth < 1280) { // xl
        setItemsPerView(4);
      } else { // 2xl
        setItemsPerView(5);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, availableProperties.length - itemsPerView);

  const scrollToNext = () => {
    if (currentIndex >= availableProperties.length - itemsPerView) {
      // วนกลับไปเริ่มต้น
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const scrollToPrev = () => {
    if (currentIndex <= 0) {
      // วนไปท้ายสุด
      setCurrentIndex(availableProperties.length - itemsPerView);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleProperties = availableProperties.slice(currentIndex, currentIndex + itemsPerView);

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    if (availableProperties.length <= itemsPerView) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || availableProperties.length <= itemsPerView) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || availableProperties.length <= itemsPerView) return;
    
    const diff = startX - currentX;
    const threshold = window.innerWidth < 768 ? 30 : 50; // lower threshold for mobile
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next
        scrollToNext();
      } else {
        // Swipe right - previous
        scrollToPrev();
      }
    }
    
    setIsDragging(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (availableProperties.length <= itemsPerView) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || availableProperties.length <= itemsPerView) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging || availableProperties.length <= itemsPerView) return;
    
    const diff = startX - currentX;
    const threshold = window.innerWidth < 768 ? 30 : 50; // lower threshold for mobile
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        scrollToNext();
      } else {
        scrollToPrev();
      }
    }
    
    setIsDragging(false);
  };

  // Auto-slide effect - DISABLED
  // useEffect(() => {
  //   if (availableProperties.length <= itemsPerView) return;
    
  //   const interval = setInterval(() => {
  //     if (!isDragging) {
  //       scrollToNext();
  //     }
  //   }, 5000); // Auto-slide every 5 seconds

  //   return () => clearInterval(interval);
  // }, [currentIndex, isDragging, availableProperties.length]);

  return (
    <div className="w-full max-w-full mx-auto">
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-4">ทรัพย์ที่พร้อมให้เช่า</h2>
          <p className="text-gray-600">เลือกจากทรัพย์คุณภาพที่ผ่านการคัดสรร</p>
        </div>

        {availableProperties.length > 0 ? (
          <>
            <div className="relative">
              {/* Navigation Buttons - REMOVED (showing only 4 cards) */}

              {/* Navigation Buttons */}
              {availableProperties.length > itemsPerView && (
                <>
                  <button
                    onClick={scrollToPrev}
                    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 p-2 rounded-full shadow-lg border border-gray-200 transition-all duration-200"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={scrollToNext}
                    className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 p-2 rounded-full shadow-lg border border-gray-200 transition-all duration-200"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Slider Container */}
              <div 
                ref={scrollContainerRef}
                className="flex gap-2 md:gap-4 overflow-hidden cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
                  userSelect: isDragging ? 'none' : 'auto'
                }}
              >
                {availableProperties.map((property, index) => (
                  <motion.div
                    key={`${property.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <PropertyCard
                      property={property}
                      onView={handleViewProperty}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Dots Indicator */}
              {availableProperties.length > itemsPerView && (
                <div className="hidden md:flex justify-center gap-2 mt-6">
                  {Array.from({ length: Math.ceil(availableProperties.length / itemsPerView) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i * itemsPerView)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        Math.floor(currentIndex / itemsPerView) === i
                          ? 'bg-blue-500 w-6'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}


            </div>
            
            {availableProperties.length > 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8"
              >
                <button 
                  onClick={() => setShowFilters(true)}
                  className="view-all-button"
                >
                  ดูทรัพย์ทั้งหมด ({availableProperties.length} รายการ)
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              ยังไม่มีทรัพย์ที่พร้อมให้เช่า
            </h3>
            <p className="text-gray-500 mb-6">
              กรุณาติดตามอัปเดตใหม่
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PropertiesSection; 