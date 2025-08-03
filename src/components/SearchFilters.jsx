
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Filter, 
  X,
  Home,
  Building,
  Bed,
  Bath
} from 'lucide-react';

const SearchFilters = ({ onSearch, onFilterChange, filters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const locations = [
    'บางนา', 'สุขุมวิท', 'อโศก', 'สีลม', 'สาทร', 'ราชเทวี', 
    'ห้วยขวาง', 'ลาดพร้าว', 'รามคำแหง', 'บางกะปิ', 'วัฒนา', 
    'คลองเตย', 'ปทุมวัน', 'ดินแดง', 'จตุจักร', 'ลาดกระบัง'
  ];

  const propertyTypes = [
    'คอนโด', 'อพาร์ทเมนท์', 'บ้านเดี่ยว', 'ทาวน์เฮาส์', 
    'บ้านแฝด', 'ออฟฟิศ', 'ร้านค้า', 'โกดัง'
  ];

  const handleSearch = () => {
    const searchFilters = {
      searchTerm,
      priceRange,
      location: selectedLocation,
      propertyType,
      bedrooms,
      bathrooms
    };
    
    onSearch(searchFilters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 100000]);
    setSelectedLocation('');
    setPropertyType('');
    setBedrooms('');
    setBathrooms('');
    onSearch({});
  };

  const popularSearches = [
    'คอนโดใกล้ BTS', 'บ้านเช่าราคาถูก', 'อพาร์ทเมนท์สุขุมวิท', 
    'ออฟฟิศสาทร', 'คอนโดบางนา'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="search-filters w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Search className="h-5 w-5" />
            ค้นหาอสังหาริมทรัพย์
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Main Search */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหาตามชื่อ, ที่อยู่, หรือคำสำคัญ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="px-6">
              ค้นหา
            </Button>
          </div>

          {/* Popular Searches */}
          <div>
            <span className="text-sm text-gray-600 mb-2 block">การค้นหายอดนิยม:</span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => {
                    setSearchTerm(search);
                    handleSearch();
                  }}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                <MapPin className="inline h-4 w-4 mr-1" />
                ที่อยู่
              </label>
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">เลือกพื้นที่</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                <Home className="inline h-4 w-4 mr-1" />
                ประเภท
              </label>
              <Select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">เลือกประเภท</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                ราคา (บาท/เดือน)
              </label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100000}
                  min={0}
                  step={1000}
                  className="price-range-slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>฿{priceRange[0].toLocaleString()}</span>
                  <span>฿{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showAdvanced ? 'ซ่อน' : 'แสดง'}ตัวกรองเพิ่มเติม
            </Button>
            
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4 mr-2" />
              ล้างตัวกรอง
            </Button>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200"
            >
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  <Bed className="inline h-4 w-4 mr-1" />
                  จำนวนห้องนอน
                </label>
                <Select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option value="">ไม่ระบุ</option>
                  <option value="1">1 ห้อง</option>
                  <option value="2">2 ห้อง</option>
                  <option value="3">3 ห้อง</option>
                  <option value="4">4+ ห้อง</option>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  <Bath className="inline h-4 w-4 mr-1" />
                  จำนวนห้องน้ำ
                </label>
                <Select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                >
                  <option value="">ไม่ระบุ</option>
                  <option value="1">1 ห้อง</option>
                  <option value="2">2 ห้อง</option>
                  <option value="3">3 ห้อง</option>
                  <option value="4">4+ ห้อง</option>
                </Select>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SearchFilters;
