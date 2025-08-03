import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import homesectionImage from '@/assets/modern-luxury-villa-architectural-design.png';

const HeroSection = ({ setShowFilters }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-3xl shadow-2xl">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Very Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-indigo-500/3 to-purple-500/3"></div>
      
      {/* Soft Decorative Elements */}
      <div className="absolute top-8 left-8 w-24 h-24 bg-gradient-to-br from-blue-200/15 to-indigo-200/15 rounded-full blur-2xl"></div>
      <div className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-br from-indigo-200/15 to-purple-200/15 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-full mx-auto px-8 sm:px-12 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-blue-700 font-medium mb-2">ยินดีต้อนรับสู่ PropertyHub</p>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                ค้นหาที่พักในฝัน
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                แพลตฟอร์มอสังหาริมทรัพย์ที่ดีที่สุด พร้อมระบบค้นหาอัจฉริยะ 
                ค้นหาคอนโด อพาร์ทเมนท์ บ้านเช่า ในทำเลที่คุณต้องการ
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowFilters(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  เริ่มค้นหาทรัพย์
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  ดูทรัพย์ทั้งหมด
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md">
                  <div className="text-2xl font-bold text-gray-800">500+</div>
                  <div className="text-gray-700 text-sm">ทรัพย์ทั้งหมด</div>
                </div>
                <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md">
                  <div className="text-2xl font-bold text-gray-800">50+</div>
                  <div className="text-gray-700 text-sm">ทำเลยอดนิยม</div>
                </div>
                <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md">
                  <div className="text-2xl font-bold text-gray-800">4.8</div>
                  <div className="text-gray-700 text-sm">คะแนนเฉลี่ย</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - House Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] flex items-center justify-center">
              <img
                src={homesectionImage}
                alt="บ้านสวยงาม"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 