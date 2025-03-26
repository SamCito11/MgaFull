import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './shared/components/Navigation';
import { NavigationBar } from './shared/components/NavigationBar';
import { AuthProvider } from './features/auth/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Navigation />
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%'
        }}>
          <NavigationBar />
          <main style={{ 
            flexGrow: 1, 
            padding: '2rem',
            width: 'calc(100% - 320px)',
            marginLeft: '280px',
            marginRight: '200px',
            position: 'fixed',
            boxSizing: 'border-box',
            top: '64px' // Height of NavigationBar
          }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
