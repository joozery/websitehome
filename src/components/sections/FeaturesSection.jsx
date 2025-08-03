import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Users } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: 'ค้นหาอัจฉริยะ',
      description: 'ระบบค้นหาที่แม่นยำ พร้อมแนะนำทรัพย์ใกล้เคียง',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'ปลอดภัย เชื่อถือได้',
      description: 'ทรัพย์ทุกรายการผ่านการตรวจสอบ พร้อมระบบรักษาความปลอดภัย',
      color: 'green'
    },
    {
      icon: Users,
      title: 'ติดต่อง่าย',
      description: 'ติดต่อเจ้าของทรัพย์ได้ทันที ผ่านโทรศัพท์ Line Facebook WhatsApp',
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="w-full max-w-full mx-auto px-8 sm:px-12 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="feature-card text-center"
          >
            <div className={`w-16 h-16 ${getColorClasses(feature.color)} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <feature.icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection; 