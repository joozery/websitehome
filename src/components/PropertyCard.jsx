import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Phone, 
  MessageCircle, 
  Facebook,
  Calendar,
  Eye,
  Heart
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useFavorites } from '@/hooks/useFavorites';

const PropertyCard = ({ property, onView }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(property.id);

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { label: 'ว่าง', className: 'bg-green-100 text-green-800' },
      rented: { label: 'ให้เช่าแล้ว', className: 'bg-red-100 text-red-800' },
      'coming-soon': { label: 'เร็วๆ นี้', className: 'bg-yellow-100 text-yellow-800' }
    };
    
    const config = statusConfig[status] || statusConfig.available;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleContact = (type, value) => {
    if (!value) {
      toast({ title: "ไม่มีข้อมูลติดต่อ", variant: "destructive" });
      return;
    }
    const contactActions = {
      phone: () => window.open(`tel:${value}`, '_self'),
      line: () => window.open(`https://line.me/ti/p/${value}`, '_blank'),
      facebook: () => window.open(`https://facebook.com/${value}`, '_blank'),
      whatsapp: () => window.open(`https://wa.me/${value}`, '_blank')
    };
    contactActions[type]();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="property-card group"
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-200 bg-white shadow-sm hover:border-blue-300">
        <div className="relative">
          <div className="relative h-64 overflow-hidden">
            <img  
              alt={`${property.title} - ${property.location}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src={property.images?.[0] || "https://images.unsplash.com/photo-1685279053124-f47a436a9c1e"} />
            
            <div className="watermark-overlay"><div className="watermark-text">PROPERTY</div></div>
            <div className="absolute top-4 left-4">{getStatusBadge(property.status)}</div>
            <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono">{property.code}</div>
            
            <Button
              size="icon"
              variant="ghost"
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-700 hover:text-red-500"
              onClick={(e) => { e.stopPropagation(); toggleFavorite(property.id); }}
            >
              <Heart className={`h-4 w-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2rem]">{property.title}</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-blue-600">฿{property.price.toLocaleString()}/เดือน</span>
                <span className="text-xs text-gray-500">{property.category}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-3 w-3 mr-1 text-blue-500" />
                <span className="text-xs">{property.location}</span>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                <div className="flex items-center"><Bed className="h-3 w-3 mr-1 text-blue-500" /> {property.bedrooms}</div>
                <div className="flex items-center"><Bath className="h-3 w-3 mr-1 text-blue-500" /> {property.bathrooms}</div>
                <div className="flex items-center"><Square className="h-3 w-3 mr-1 text-blue-500" /> {property.area} ตร.ม.</div>
              </div>

              {property.status === 'coming-soon' && property.availableDate && (
                <div className="flex items-center text-xs text-yellow-600 bg-yellow-50 p-2 rounded-md">
                  <Calendar className="h-3 w-3 mr-1" />
                  จะว่างวันที่: {new Date(property.availableDate).toLocaleDateString('th-TH')}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-center gap-2">
                <Button size="sm" className="text-xs px-4 py-2 h-8" onClick={() => onView(property)}>
                  <Eye className="h-3 w-3 mr-1" />
                  ดูรายละเอียด
                </Button>
                <Button size="sm" variant="outline" className="p-2 h-8 w-8" onClick={() => handleContact('phone', property.contact.phone)}>
                  <Phone className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" className="p-2 h-8 w-8" onClick={() => handleContact('line', property.contact.line)}>
                  <MessageCircle className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" className="p-2 h-8 w-8" onClick={() => handleContact('facebook', property.contact.facebook)}>
                  <Facebook className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;