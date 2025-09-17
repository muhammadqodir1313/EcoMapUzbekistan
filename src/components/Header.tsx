import React, { useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Recycle, Home, MapPin, Info, Phone, Plus } from 'lucide-react';
import { I18nContext } from '../main';

export default function Header() {
  const location = useLocation();
  const { lang } = useContext(I18nContext);

  const t = useMemo(() => {
    const dict: Record<string, Record<'home'|'map'|'add'|'about'|'contact'|'tagline','string'>> = {
      uz: { home: "Bosh sahifa", map: "Xarita", add: "Punkt qo'shish", about: "Biz haqimizda", contact: "Aloqa", tagline: "Qayta ishlash punktlari" },
    };
    return dict['uz'];
  }, [lang]);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-2 rounded-xl shadow-glow">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                EcoMap Uzbekistan
              </h1>
              <p className="text-xs text-gray-500 font-medium">{t.tagline}</p>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 shadow-inner-glow after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-0.5 after:bg-primary-500 after:rounded-full' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:shadow-md'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>{t.home}</span>
            </Link>
            
            <Link
              to="/map"
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                isActive('/map') 
                  ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 shadow-inner-glow after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-0.5 after:bg-primary-500 after:rounded-full' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:shadow-md'
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>{t.map}</span>
            </Link>
            
            <Link
              to="/add-center"
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                isActive('/add-center') 
                  ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 shadow-inner-glow after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-0.5 after:bg-primary-500 after:rounded-full' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:shadow-md'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>{t.add}</span>
            </Link>
            
            <Link
              to="/about"
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                isActive('/about') 
                  ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 shadow-inner-glow after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-0.5 after:bg-primary-500 after:rounded-full' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:shadow-md'
              }`}
            >
              <Info className="h-4 w-4" />
              <span>{t.about}</span>
            </Link>
            
            <Link
              to="/contact"
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                isActive('/contact') 
                  ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 shadow-inner-glow after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-0.5 after:bg-primary-500 after:rounded-full' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:shadow-md'
              }`}
            >
              <Phone className="h-4 w-4" />
              <span>{t.contact}</span>
            </Link>
            
          </nav>
          
          {/* Controls removed: only Uzbek language */}

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label="Menu">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}