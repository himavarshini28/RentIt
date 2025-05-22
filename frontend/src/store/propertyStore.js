import { create } from 'zustand';

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
      const response = await fetch('http://localhost:3000/api/property/v1/get-properties', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch properties');
      }

      set({ 
        properties: data, 
        filteredProperties: data, 
        isLoading: false, 
        error: null 
      });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  fetchPropertyById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // API call to get property by ID
      const response = await fetch(`http://localhost:3000/api/property/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch property');
      }

      set({ currentProperty: data, isLoading: false, error: null });
      return data;
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