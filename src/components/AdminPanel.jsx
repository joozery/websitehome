import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PropertyForm from '@/components/admin/PropertyForm';
import PropertyList from '@/components/admin/PropertyList';

const AdminPanel = ({ properties, onAddProperty, onUpdateProperty, onDeleteProperty }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const handleAddNew = () => {
    setEditingProperty(null);
    setShowForm(true);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text">แผงควบคุมแอดมิน</h2>
          <p className="text-gray-600">จัดการข้อมูลอสังหาริมทรัพย์</p>
        </div>
        <Button onClick={handleAddNew} className="admin-panel">
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มทรัพย์ใหม่
        </Button>
      </div>

      {showForm && (
        <PropertyForm
          property={editingProperty}
          onSave={(propertyData) => {
            if (editingProperty) {
              onUpdateProperty(editingProperty.id, propertyData);
            } else {
              onAddProperty(propertyData);
            }
            handleCloseForm();
          }}
          onClose={handleCloseForm}
        />
      )}

      <PropertyList
        properties={properties}
        onEdit={handleEdit}
        onDelete={onDeleteProperty}
        onUpdateProperty={onUpdateProperty}
      />
    </div>
  );
};

export default AdminPanel;