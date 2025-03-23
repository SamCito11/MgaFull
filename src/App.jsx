import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './shared/components/Navigation';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Navigation />
      <main style={{ flexGrow: 1, marginLeft: '280px', padding: '20px' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
