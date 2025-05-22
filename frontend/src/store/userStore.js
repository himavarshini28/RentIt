import { create } from 'zustand';
import { AUTH_ENDPOINTS } from '../utils/config';

const useUserStore = create((set) => ({
  // User state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Auth methods
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // API call to login
      console.log('Login endpoint:', AUTH_ENDPOINTS.LOGIN);
      const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token to local storage
      localStorage.setItem('token', data.token);
      
      // Set user in state
      set({ user: data.user, isAuthenticated: true, isLoading: false, error: null });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      // API call to signup
      console.log('Sending signup request to:', AUTH_ENDPOINTS.SIGNUP, 'with data:', userData);
      
      const response = await fetch(AUTH_ENDPOINTS.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Signup response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Save token to local storage
      if (data.token) {
        localStorage.setItem('token', data.token);
      } else {
        console.warn('No token received during signup');
      }
      
      // Set user in state
      set({ 
        user: data.user || data, 
        isAuthenticated: true, 
        isLoading: false, 
        error: null 
      });
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  logout: () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    
    // Reset state
    set({ user: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ isLoading: false });
        return null;
      }      // API call to validate token and get user data
      console.log('Validating token using:', AUTH_ENDPOINTS.PROFILE);
      const response = await fetch(AUTH_ENDPOINTS.PROFILE, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Set user in state
      set({ user: data, isAuthenticated: true, isLoading: false, error: null });
      return data;
    } catch (error) {
      // If token validation fails, logout
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false, isLoading: false, error: error.message });
      return null;
    }
  },
}));

export default useUserStore;
