import { create } from 'zustand';
import { PROPERTY_ENDPOINTS } from '../utils/config';

const usePropertyStore = create((set, get) => ({
  // Properties state
  properties: [],
  filteredProperties: [],
  currentProperty: null,
  isLoading: false,
  error: null,

  // Filters
  filters: {
    location: '',
    minPrice: 0,
    maxPrice: Infinity,
    bedrooms: 0,
    bathrooms: 0,
  },
  
  // Actions
  setProperties: (properties) => set({ properties }),
  setCurrentProperty: (property) => set({ currentProperty: property }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
    get().applyFilters();
  },
  
  // Methods
  fetchProperties: async () => {
    set({ isLoading: true, error: null });
    try {
      // API call to get properties
      const response = await fetch(PROPERTY_ENDPOINTS.ALL, {
        method: 'POST', // Changed to POST to match backend
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Property store fetch response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch properties');
      }

      set({ 
        properties: data.properties || [], // Access the properties array
        filteredProperties: data.properties || [], 
        isLoading: false, 
        error: null 
      });
      return data.properties || [];
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  fetchPropertyById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // API call to get property by ID
      const response = await fetch(PROPERTY_ENDPOINTS.DETAIL(id), {
        method: 'POST', // Changed to POST to match backend
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Property detail fetch response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch property');
      }

      set({ currentProperty: data.property || {}, isLoading: false, error: null });
      return data.property || {};
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  applyFilters: () => {
    const { properties, filters } = get();
    const filtered = properties.filter(property => {
      // Apply location filter
      if (filters.location && 
          !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Apply price filter
      if (property.rentAmount < filters.minPrice || 
          (filters.maxPrice !== Infinity && property.rentAmount > filters.maxPrice)) {
        return false;
      }
      
      // Apply bedrooms filter
      if (filters.bedrooms > 0 && property.bedrooms < filters.bedrooms) {
        return false;
      }
      
      // Apply bathrooms filter
      if (filters.bathrooms > 0 && property.bathrooms < filters.bathrooms) {
        return false;
      }
      
      return true;
    });
    
    set({ filteredProperties: filtered });
  },

  clearFilters: () => {
    set({ 
      filters: {
        location: '',
        minPrice: 0,
        maxPrice: Infinity,
        bedrooms: 0,
        bathrooms: 0,
      },
      filteredProperties: get().properties
    });
  }
}));

export default usePropertyStore;