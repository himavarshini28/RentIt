import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'
import { setupMockApi } from './utils/mockApi'
import { BrowserRouter } from 'react-router-dom'

// Setup mock API for development without backend
setupMockApi();

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Initialize app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
