import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import AddCenterPage from './pages/AddCenterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { I18nContext } from './main';

function App() {
  const { lang } = useContext(I18nContext);
  return (
    <Router>
      <div className={`min-h-screen bg-gray-50`}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/add-center" element={<AddCenterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;