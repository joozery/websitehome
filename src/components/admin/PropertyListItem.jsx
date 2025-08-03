import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PropertyListItem = ({ property, onEdit, onDelete, onUpdateProperty }) => {
  const statusOptions = [
    { value: 'available', label: 'ว่าง', color: 'bg-green-100 text-green-800' },
    { value: 'rented', label: 'ให้เช่าแล้ว', color: 'bg-red-100 text-red-800' },
    { value: 'coming-soon', label: 'เร็วๆ นี้', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const handleDelete = () => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบทรัพย์นี้?')) {
      onDelete(property.id);
      toast({
        title: "ลบทรัพย์สำเร็จ!",
        description: "ทรัพย์ได้รับการลบออกจากระบบแล้ว"
      });
    }
  };

  const togglePropertyStatus = () => {
    const newStatus = property.status === 'available' ? 'rented' : 'available';
    onUpdateProperty(property.id, { ...property, status: newStatus });
    toast({
      title: "อัปเดตสถานะสำเร็จ!",
      description: `เปลี่ยนสถานะเป็น ${newStatus === 'available' ? 'ว่าง' : 'ให้เช่าแล้ว'}`
    });
  };

  const statusConfig = statusOptions.find(s => s.value === property.status) || statusOptions[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="property-code">{property.code}</span>
          <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
          {property.status === 'available' && property.availableDate && (
            <span className="text-xs text-gray-500">
              ว่าง: {new Date(property.availableDate).toLocaleDateString('th-TH')}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-900">{property.title}</h3>
        <p className="text-sm text-gray-600">{property.location}</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span>฿{property.price.toLocaleString()}/เดือน</span>
          <span>{property.bedrooms} ห้องนอน</span>
          <span>{property.bathrooms} ห้องน้ำ</span>
          <span>{property.area} ตร.ม.</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={togglePropertyStatus}>
          {property.status === 'available' ? (
            <><EyeOff className="h-4 w-4 mr-1" />ซ่อน</>
          ) : (
            <><Eye className="h-4 w-4 mr-1" />แสดง</>
          )}
        </Button>
        <Button size="sm" variant="outline" onClick={() => onEdit(property)}>
          <Edit className="h-4 w-4 mr-1" />แก้ไข
        </Button>
        <Button size="sm" variant="outline" onClick={handleDelete} className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="h-4 w-4 mr-1" />ลบ
        </Button>
      </div>
    </motion.div>
  );
};

export default PropertyListItem;