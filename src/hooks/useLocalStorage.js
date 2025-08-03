
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export const useProperties = () => {
  const [properties, setProperties] = useLocalStorage('properties', []);

  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProperties(prev => [...prev, newProperty]);
    return newProperty;
  };

  const updateProperty = (id, updates) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === id 
          ? { ...property, ...updates, updatedAt: new Date().toISOString() }
          : property
      )
    );
  };

  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(property => property.id !== id));
  };

  const searchProperties = (filters) => {
    return properties.filter(property => {
      const matchesSearch = !filters.searchTerm || 
        property.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        property.description?.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesLocation = !filters.location || 
        property.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesType = !filters.propertyType || 
        property.category === filters.propertyType;

      const matchesPrice = !filters.priceRange || 
        (property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]);

      const matchesBedrooms = !filters.bedrooms || 
        property.bedrooms.toString() === filters.bedrooms;

      const matchesBathrooms = !filters.bathrooms || 
        property.bathrooms.toString() === filters.bathrooms;

      return matchesSearch && matchesLocation && matchesType && 
             matchesPrice && matchesBedrooms && matchesBathrooms;
    });
  };

  const getNearbyProperties = (property, limit = 4) => {
    return properties
      .filter(p => p.id !== property.id && p.location === property.location)
      .slice(0, limit);
  };

  return {
    properties,
    setProperties,
    addProperty,
    updateProperty,
    deleteProperty,
    searchProperties,
    getNearbyProperties
  };
};
