import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  Save,
  X,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  Upload
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PropertyForm = ({ property, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    floor: '',
    status: 'available',
    availableDate: '',
    contact: {
      phone: '',
      line: '',
      facebook: '',
      whatsapp: ''
    },
    images: []
  });

  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        availableDate: property.availableDate ? property.availableDate.split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        location: '',
        category: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        floor: '',
        status: 'available',
        availableDate: '',
        contact: { phone: '', line: '', facebook: '', whatsapp: '' },
        images: []
      });
    }
  }, [property]);

  const categories = [
    'คอนโด', 'อพาร์ทเมนท์', 'บ้านเดี่ยว', 'ทาวน์เฮาส์', 
    'บ้านแฝด', 'ออฟฟิศ', 'ร้านค้า', 'โกดัง'
  ];

  const statusOptions = [
    { value: 'available', label: 'ว่าง' },
    { value: 'rented', label: 'ให้เช่าแล้ว' },
    { value: 'coming-soon', label: 'เร็วๆ นี้' }
  ];

  const generatePropertyCode = () => {
    const prefix = 'PROP';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const propertyData = {
      ...formData,
      price: parseInt(formData.price) || 0,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      area: parseInt(formData.area) || 0,
      code: property ? property.code : generatePropertyCode(),
      createdAt: property ? property.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(propertyData);
    toast({
      title: `บันทึกข้อมูลสำเร็จ!`,
      description: `ทรัพย์ ${propertyData.code} ได้รับการบันทึกแล้ว`
    });
  };

  const handleImageUpload = () => {
    const imageUrl = prompt("กรุณาใส่ URL ของรูปภาพ:");
    if (imageUrl) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageUrl] }));
      toast({
        title: "เพิ่มรูปภาพสำเร็จ!",
        description: "นี่เป็นฟังก์ชันจำลอง ในระบบจริงจะเชื่อมต่อกับการอัปโหลดไฟล์"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {property ? 'แก้ไขข้อมูลทรัพย์' : 'เพิ่มทรัพย์ใหม่'}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">ชื่อทรัพย์ *</label>
                <Input value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="เช่น คอนโด The Base Park East สุขุมวิท 77" required />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block"><DollarSign className="inline h-4 w-4 mr-1" />ราคา (บาท/เดือน) *</label>
                <Input type="number" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} placeholder="15000" required />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block"><Building className="inline h-4 w-4 mr-1" />ประเภท *</label>
                <Select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} required>
                  <option value="">เลือกประเภท</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block"><MapPin className="inline h-4 w-4 mr-1" />ที่อยู่ *</label>
                <Input value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="เช่น สุขุมวิท 77, วัฒนา, กรุงเทพฯ" required />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">ห้องนอน</label>
                <Input type="number" value={formData.bedrooms} onChange={(e) => handleInputChange('bedrooms', e.target.value)} placeholder="2" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">ห้องน้ำ</label>
                <Input type="number" value={formData.bathrooms} onChange={(e) => handleInputChange('bathrooms', e.target.value)} placeholder="1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">พื้นที่ (ตร.ม.)</label>
                <Input type="number" value={formData.area} onChange={(e) => handleInputChange('area', e.target.value)} placeholder="35" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">ชั้น</label>
                <Input value={formData.floor} onChange={(e) => handleInputChange('floor', e.target.value)} placeholder="15" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">สถานะ</label>
                <Select value={formData.status} onChange={(e) => handleInputChange('status', e.target.value)}>
                  {statusOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block"><Calendar className="inline h-4 w-4 mr-1" />วันที่ว่าง</label>
                <Input type="date" value={formData.availableDate} onChange={(e) => handleInputChange('availableDate', e.target.value)} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">รายละเอียด</label>
              <Textarea value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับทรัพย์..." rows={4} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลติดต่อ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input value={formData.contact.phone} onChange={(e) => handleInputChange('contact.phone', e.target.value)} placeholder="เบอร์โทร" />
                <Input value={formData.contact.line} onChange={(e) => handleInputChange('contact.line', e.target.value)} placeholder="Line ID" />
                <Input value={formData.contact.facebook} onChange={(e) => handleInputChange('contact.facebook', e.target.value)} placeholder="Facebook Username" />
                <Input value={formData.contact.whatsapp} onChange={(e) => handleInputChange('contact.whatsapp', e.target.value)} placeholder="WhatsApp Number" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">รูปภาพ</label>
              <Button type="button" variant="outline" onClick={handleImageUpload} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                อัปโหลดรูปภาพ (จำลอง)
              </Button>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images && formData.images.map((img, index) => (
                  <img key={index} src={img} alt={`property-img-${index}`} className="w-20 h-20 object-cover rounded-md" />
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button type="submit" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                {property ? 'อัปเดต' : 'บันทึก'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                ยกเลิก
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyForm;