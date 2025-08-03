import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'หน้าแรก', href: '#' },
    { name: 'ทรัพย์ทั้งหมด', href: '#' },
    { name: 'ค้นหา', href: '#' },
    { name: 'เกี่ยวกับเรา', href: '#' },
    { name: 'ติดต่อเรา', href: '#' },
  ];

  const services = [
    { name: 'คอนโดเช่า', href: '#' },
    { name: 'บ้านเช่า', href: '#' },
    { name: 'อพาร์ทเมนท์', href: '#' },
    { name: 'หอพัก', href: '#' },
    { name: 'ที่ดิน', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-t border-gray-100">
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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">PropertyHub</h3>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              แพลตฟอร์มอสังหาริมทรัพย์ที่ดีที่สุด พร้อมระบบค้นหาอัจฉริยะ 
              ค้นหาคอนโด อพาร์ทเมนท์ บ้านเช่า ในทำเลที่คุณต้องการ
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="w-9 h-9 bg-gray-50 hover:bg-blue-50 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-6">ลิงก์ด่วน</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 inline-block text-sm font-medium"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-6">บริการของเรา</h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <motion.li
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <a
                    href={service.href}
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 inline-block text-sm font-medium"
                  >
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-6">ติดต่อเรา</h4>
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start space-x-3"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">โทรศัพท์</p>
                  <p className="text-gray-800 font-medium">02-123-4567</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-start space-x-3"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">อีเมล</p>
                  <p className="text-gray-800 font-medium">info@propertyhub.com</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-start space-x-3"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">ที่อยู่</p>
                  <p className="text-gray-800 font-medium text-sm leading-relaxed">123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="border-t border-gray-100 mt-16 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} PropertyHub. สงวนลิขสิทธิ์ทุกประการ
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors font-medium">
                นโยบายความเป็นส่วนตัว
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors font-medium">
                เงื่อนไขการใช้งาน
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors font-medium">
                แผนผังเว็บไซต์
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 