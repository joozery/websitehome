import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PropertyListItem from '@/components/admin/PropertyListItem';
import { Building } from 'lucide-react';

const PropertyList = ({ properties, onEdit, onDelete, onUpdateProperty }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>รายการทรัพย์ทั้งหมด ({properties.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {properties.map((property) => (
            <PropertyListItem
              key={property.id}
              property={property}
              onEdit={onEdit}
              onDelete={onDelete}
              onUpdateProperty={onUpdateProperty}
            />
          ))}
          {properties.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>ยังไม่มีข้อมูลทรัพย์</p>
              <p className="text-sm">เริ่มต้นด้วยการเพิ่มทรัพย์แรกของคุณ</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyList;