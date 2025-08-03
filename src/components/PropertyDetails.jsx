
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Phone, 
  MessageCircle, 
  Facebook,
  Building,
  Clock,
  Star,
  Share2,
  Heart
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PropertyDetails = ({ property, onClose, nearbyProperties = [] }) => {
  if (!property) return null;

  const handleContact = (type, value) => {
    const contactActions = {
      phone: () => window.open(`tel:${value}`, '_self'),
      line: () => window.open(`https://line.me/ti/p/${value}`, '_blank'),
      facebook: () => window.open(`https://facebook.com/${value}`, '_blank'),
      whatsapp: () => window.open(`https://wa.me/${value}`, '_blank')
    };

    if (contactActions[type]) {
      contactActions[type]();
    } else {
      toast({
        title: "🚧 ฟีเจอร์นี้ยังไม่พร้อมใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไปได้! 🚀"
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} - ฿${property.price.toLocaleString()}/เดือน`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "คัดลอกลิงก์แล้ว!",
        description: "ลิงก์ได้รับการคัดลอกไปยังคลิปบอร์ดแล้ว"
      });
    }
  };

  const handleFavorite = () => {
    toast({
      title: "🚧 ฟีเจอร์นี้ยังไม่พร้อมใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไปได้! 🚀"
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { label: 'ว่าง', className: 'bg-green-100 text-green-800' },
      rented: { label: 'ให้เช่าแล้ว', className: 'bg-red-100 text-red-800' },
      'coming-soon': { label: 'เร็วๆ นี้', className: 'bg-yellow-100 text-yellow-800' }
    };
    
    const config = statusConfig[status] || statusConfig.available;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const amenities = [
    'ปรับอากาศ', 'เฟอร์นิเจอร์ครบ', 'อินเทอร์เน็ต', 'ที่จอดรถ',
    'สระว่ายน้ำ', 'ฟิตเนส', 'รปภ. 24 ชม.', 'ลิฟต์'
  ];

  return (
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
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="property-code">{property.code}</span>
                {getStatusBadge(property.status)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleFavorite}>
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <img  
                    alt={`${property.title} main image`}
                    className="w-full h-full object-cover"
                   src="https://images.unsplash.com/photo-1676828390434-6ae9782fd194" />
                  
                  {/* Watermark */}
                  <div className="watermark-overlay">
                    <div className="watermark-text">
                      PROPERTY
                    </div>
                  </div>
                </div>
                
                {/* Additional Images */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img  
                      alt={`${property.title} bedroom`}
                      className="w-full h-full object-cover"
                     src="https://images.unsplash.com/photo-1539528408517-3e496473be3c" />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img  
                      alt={`${property.title} bathroom`}
                      className="w-full h-full object-cover"
                     src="https://images.unsplash.com/photo-1643949700446-7905f6e08b33" />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img  
                      alt={`${property.title} kitchen`}
                      className="w-full h-full object-cover"
                     src="https://images.unsplash.com/photo-1613237928278-d5ab2da3749c" />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img  
                      alt={`${property.title} living room`}
                      className="w-full h-full object-cover"
                     src="https://images.unsplash.com/photo-1563764669-c31be0c75ae5" />
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    รายละเอียดทรัพย์
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Bed className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600">ห้องนอน</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Bath className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                      <div className="text-sm text-gray-600">ห้องน้ำ</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Square className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">{property.area}</div>
                      <div className="text-sm text-gray-600">ตร.ม.</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Building className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">{property.floor}</div>
                      <div className="text-sm text-gray-600">ชั้น</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>{property.location}</span>
                  </div>

                  {property.availableDate && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>ว่างวันที่: {new Date(property.availableDate).toLocaleDateString('th-TH')}</span>
                    </div>
                  )}

                  {property.description && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">รายละเอียด</h3>
                      <p className="text-gray-600 leading-relaxed">{property.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-600" />
                    สิ่งอำนวยความสะดวก
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="property-amenities">
                    {amenities.map((amenity, index) => (
                      <span key={index} className="amenity-tag">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Nearby Properties */}
              {nearbyProperties.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      ทรัพย์ใกล้เคียง
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {nearbyProperties.slice(0, 4).map((nearbyProperty) => (
                        <div key={nearbyProperty.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                          <h4 className="font-semibold text-gray-900 mb-1">{nearbyProperty.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{nearbyProperty.location}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-blue-600">
                              ฿{nearbyProperty.price.toLocaleString()}/เดือน
                            </span>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{nearbyProperty.bedrooms}ห้องนอน</span>
                              <span>{nearbyProperty.area}ตร.ม.</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price and Status */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ฿{property.price.toLocaleString()}
                    </div>
                    <div className="text-gray-600">ต่อเดือน</div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      className="w-full contact-phone"
                      onClick={() => handleContact('phone', property.contact.phone)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      โทรหาเจ้าของ
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="contact-line"
                        onClick={() => handleContact('line', property.contact.line)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Line
                      </Button>
                      <Button
                        variant="outline"
                        className="contact-whatsapp"
                        onClick={() => handleContact('whatsapp', property.contact.whatsapp)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        WhatsApp
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full contact-facebook"
                      onClick={() => handleContact('facebook', property.contact.facebook)}
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Property Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    ประวัติทรัพย์
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="property-timeline">
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div>
                        <div className="font-medium text-gray-900">เพิ่มทรัพย์</div>
                        <div className="text-sm text-gray-600">
                          {new Date(property.createdAt).toLocaleDateString('th-TH')}
                        </div>
                      </div>
                    </div>
                    {property.updatedAt !== property.createdAt && (
                      <div className="timeline-item">
                        <div className="timeline-dot bg-yellow-500"></div>
                        <div>
                          <div className="font-medium text-gray-900">อัปเดตข้อมูล</div>
                          <div className="text-sm text-gray-600">
                            {new Date(property.updatedAt).toLocaleDateString('th-TH')}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>สถิติ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="property-stats">
                    <div className="stat-card">
                      <div className="stat-number">127</div>
                      <div className="stat-label">ผู้เข้าชม</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">23</div>
                      <div className="stat-label">สนใจ</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">5</div>
                      <div className="stat-label">ติดต่อ</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">4.8</div>
                      <div className="stat-label">คะแนน</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PropertyDetails;
