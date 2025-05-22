// This file creates a mock API for testing when the backend is not available
export const setupMockApi = () => {
  // Check if we're in development mode and should use mock API
  const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true';
  
  if (useMockApi) {
    console.log('Setting up mock API interceptors...');
    
    // Save original fetch
    const originalFetch = window.fetch;
    
    // Create a simple in-memory storage
    const mockStorage = {
      users: [
        {
          id: '1',
          fullName: 'John Doe',
          email: 'john@example.com',
          phoneNumber: '123-456-7890',
        }
      ],
      properties: [
        {
          id: '1',
          title: 'Modern Apartment in City Center',
          description: 'Beautiful modern apartment with all amenities',
          price: 1500,
          location: 'New York, NY',
          bedrooms: 2,
          bathrooms: 1,
          image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
          featured: true,
        },
        {
          id: '2',
          title: 'Cozy Studio Near Campus',
          description: 'Perfect for students, close to university',
          price: 900,
          location: 'Boston, MA',
          bedrooms: 1,
          bathrooms: 1,
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
          featured: false,
        }
      ],
    };
    
    // Mock fetch implementation
    window.fetch = async (url, options = {}) => {
      console.log(`Mock API request to ${url}`);
      
      // Handle authentication
      if (url.includes('/api/user/login')) {
        const body = JSON.parse(options.body);
        if (body.email === 'test@example.com' && body.password === 'password') {
          return createResponse({
            user: { ...mockStorage.users[0], email: body.email },
            token: 'mock-token-12345'
          }, 200);
        }
        return createResponse({ message: 'Invalid credentials' }, 401);
      }
      
      // Handle signup
      if (url.includes('/api/user/signup')) {
        const body = JSON.parse(options.body);
        // Check if email exists
        if (mockStorage.users.some(u => u.email === body.email)) {
          return createResponse({ message: 'Email already in use' }, 400);
        }
        
        const newUser = {
          id: Date.now().toString(),
          fullName: body.fullName,
          email: body.email,
          phoneNumber: body.phoneNumber,
        };
        
        mockStorage.users.push(newUser);
        
        return createResponse({
          user: newUser,
          token: 'mock-token-' + Date.now()
        }, 201);
      }
      
      // Check auth
      if (url.includes('/api/user/me')) {
        const authHeader = options.headers?.Authorization;
        
        if (authHeader && authHeader.startsWith('Bearer mock-token')) {
          return createResponse(mockStorage.users[0], 200);
        }
        return createResponse({ message: 'Unauthorized' }, 401);
      }
      
      // Get all properties
      if (url.includes('/api/property') && !url.includes('featured')) {
        return createResponse(mockStorage.properties, 200);
      }
      
      // Get featured properties
      if (url.includes('/api/property/featured')) {
        return createResponse(
          mockStorage.properties.filter(p => p.featured),
          200
        );
      }
      
      // Get property by ID
      if (url.match(/\/api\/property\/\d+$/)) {
        const id = url.split('/').pop();
        const property = mockStorage.properties.find(p => p.id === id);
        
        if (property) {
          return createResponse(property, 200);
        }
        return createResponse({ message: 'Property not found' }, 404);
      }
      
      // Fallback to real fetch for other requests
      return originalFetch(url, options);
    };
    
    // Helper to create Response objects
    function createResponse(data, status = 200) {
      return Promise.resolve({
        ok: status >= 200 && status < 300,
        status,
        json: async () => data,
        text: async () => JSON.stringify(data),
      });
    }
  }
};
