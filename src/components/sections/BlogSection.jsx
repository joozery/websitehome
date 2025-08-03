import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "เคล็ดลับการเลือกคอนโดให้เหมาะกับไลฟ์สไตล์",
      excerpt: "การเลือกคอนโดที่เหมาะสมกับไลฟ์สไตล์ของคุณเป็นสิ่งสำคัญมาก เรามีเคล็ดลับดีๆ มาแนะนำ",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
      date: "2024-01-15",
      readTime: "5 นาที",
      category: "เคล็ดลับ"
    },
    {
      id: 2,
      title: "เทรนด์การตกแต่งห้องเช่าในปี 2024",
      excerpt: "พบกับเทรนด์การตกแต่งห้องเช่าที่กำลังมาแรงในปี 2024 ที่จะทำให้ห้องของคุณดูทันสมัย",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
      date: "2024-01-10",
      readTime: "7 นาที",
      category: "การตกแต่ง"
    },
    {
      id: 3,
      title: "พื้นที่ไหนในกรุงเทพฯ ที่น่าอยู่ที่สุด",
      excerpt: "สำรวจพื้นที่ต่างๆ ในกรุงเทพฯ ที่มีคุณภาพชีวิตดี การเดินทางสะดวก และราคาค่าเช่าที่เหมาะสม",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      date: "2024-01-05",
      readTime: "8 นาที",
      category: "พื้นที่"
    },
    {
      id: 4,
      title: "วิธีประหยัดค่าเช่าในกรุงเทพฯ",
      excerpt: "เคล็ดลับการประหยัดค่าเช่าและการจัดการค่าใช้จ่ายให้เหมาะสมกับงบประมาณของคุณ",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
      date: "2024-01-01",
      readTime: "6 นาที",
      category: "การเงิน"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full max-w-full mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-4">บทความน่าสนใจ</h2>
          <p className="text-gray-600">เคล็ดลับและข้อมูลที่เป็นประโยชน์สำหรับการเลือกที่อยู่อาศัย</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full border border-gray-200 bg-white">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString('th-TH')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs px-3 py-2 h-8"
                  >
                    อ่านเพิ่มเติม
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" className="px-6 py-2">
            ดูบทความทั้งหมด
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 