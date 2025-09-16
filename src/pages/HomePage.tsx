import React, { useState, useEffect } from 'react';
import { useT } from '../i18n';
import { Link } from 'react-router-dom';
import { MapPin, Search, Filter, Clock, Phone, Recycle, Navigation, Star, ArrowRight } from 'lucide-react';
import Map from '../components/Map';

interface RecyclingCenter {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance?: number;
  phone: string;
  hours: string;
  materials: string[];
  description: string;
  rating: number;
}

const baseCenters: RecyclingCenter[] = [
  {
    id: 1,
    name: "EcoTashkent Qayta Ishlash Markazi",
    address: "Chilonzor tumani, Qatortol ko'chasi 15",
    lat: 41.2995,
    lng: 69.2401,
    phone: "+998 71 123 45 67",
    hours: "Dushanba-Yakshanba: 08:00-18:00",
    materials: ["Plastik", "Qog'oz", "Metall", "Shisha"],
    description: "Eng katta qayta ishlash markazi. Barcha turdagi chiqindilarni qabul qiladi.",
    rating: 4.8
  },
  {
    id: 2,
    name: "GreenLife Recycling",
    address: "Yunusobod tumani, Abdulla Qodiriy 45",
    lat: 41.3397,
    lng: 69.2895,
    phone: "+998 71 987 65 43",
    hours: "Dushanba-Juma: 09:00-17:00",
    materials: ["Plastik", "Elektron chiqindilar", "Batareyalar"],
    description: "Elektron chiqindilar va batareyalarni qayta ishlash mutaxassisi.",
    rating: 4.6
  },
  {
    id: 3,
    name: "Clean City Tashkent",
    address: "Mirzo Ulug'bek tumani, Universitet ko'chasi 12",
    lat: 41.3133,
    lng: 69.2797,
    phone: "+998 71 555 44 33",
    hours: "Dushanba-Shanba: 08:30-17:30",
    materials: ["Qog'oz", "Karton", "Metall", "Shisha"],
    description: "Qog'oz va karton materiallarni qayta ishlashda etakchi.",
    rating: 4.5
  },
  {
    id: 4,
    name: "Eco Solutions Uzbekistan",
    address: "Shayxontohur tumani, Navoi ko'chasi 78",
    lat: 41.2856,
    lng: 69.2034,
    phone: "+998 71 333 22 11",
    hours: "Har kuni: 24/7",
    materials: ["Plastik", "Organik chiqindilar", "Metall"],
    description: "24 soat xizmat ko'rsatuvchi zamonaviy qayta ishlash markazi.",
    rating: 4.9
  },
  {
    id: 5,
    name: "Recycle Pro Tashkent",
    address: "Sergeli tumani, Bunyodkor ko'chasi 23",
    lat: 41.2044,
    lng: 69.2228,
    phone: "+998 71 777 88 99",
    hours: "Dushanba-Juma: 08:00-16:00",
    materials: ["Shisha", "Plastik", "Tekstil"],
    description: "Shisha va tekstil materiallarini qayta ishlash bo'yicha mutaxassis.",
    rating: 4.3
  }
  ,
  // Farg'ona centers
  {
    id: 101,
    name: "Fergana Eco Center",
    address: "Farg'ona shahri, Mustaqillik ko'chasi 12",
    lat: 40.3842,
    lng: 71.7843,
    phone: "+998 73 123 45 67",
    hours: "Dushanba-Yakshanba: 09:00-18:00",
    materials: ["Plastik", "Qog'oz", "Metall"],
    description: "Farg'onadagi zamonaviy qayta ishlash markazi.",
    rating: 4.7
  },
  {
    id: 102,
    name: "Green Fergana Recycling",
    address: "Farg'ona tumani, Al-Farg'oniy ko'chasi 5",
    lat: 40.389,
    lng: 71.78,
    phone: "+998 73 765 43 21",
    hours: "Dushanba-Juma: 08:30-17:30",
    materials: ["Shisha", "Qog'oz", "Karton"],
    description: "Shisha va qog'ozni qayta ishlash bo'yicha ixtisoslashgan.",
    rating: 4.4
  }
];

const materialColors: { [key: string]: string } = {
  "Plastik": "bg-blue-100 text-blue-800",
  "Qog'oz": "bg-green-100 text-green-800",
  "Metall": "bg-gray-100 text-gray-800",
  "Shisha": "bg-cyan-100 text-cyan-800",
  "Elektron chiqindilar": "bg-purple-100 text-purple-800",
  "Batareyalar": "bg-red-100 text-red-800",
  "Organik chiqindilar": "bg-emerald-100 text-emerald-800",
  "Karton": "bg-yellow-100 text-yellow-800",
  "Tekstil": "bg-pink-100 text-pink-800"
};

export default function HomePage() {
  const t = useT();
  const [centers, setCenters] = useState<RecyclingCenter[]>(baseCenters);
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showMap, setShowMap] = useState(false);

  // Load custom centers from localStorage and get user location
  useEffect(() => {
    let initial: RecyclingCenter[] = baseCenters;
    try {
      const stored = JSON.parse(localStorage.getItem('customCenters') || '[]') as any[];
      if (Array.isArray(stored)) {
        const normalized = stored
          .filter(c => typeof c.lat === 'number' && typeof c.lng === 'number')
          .map((c) => ({
            id: c.id ?? Date.now(),
            name: c.name ?? 'Custom center',
            address: c.address ?? '',
            lat: c.lat,
            lng: c.lng,
            phone: c.phone ?? '',
            hours: c.hours ?? '',
            materials: Array.isArray(c.materials) ? c.materials : [],
            description: c.description ?? '',
            rating: typeof c.rating === 'number' ? c.rating : 4.5,
          })) as RecyclingCenter[];
        initial = [...baseCenters, ...normalized];
      }
    } catch (_) {
      // ignore storage errors
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          
          // Calculate distances and sort by nearest
          const centersWithDistance = initial.map(center => ({
            ...center,
            distance: calculateDistance(location.lat, location.lng, center.lat, center.lng)
          })).sort((a, b) => a.distance! - b.distance!);
          
          setCenters(centersWithDistance);
        },
        () => {
          // Default to Tashkent center if geolocation fails
          const defaultLocation = { lat: 41.2995, lng: 69.2401 };
          setUserLocation(defaultLocation);
          const centersWithDistance = initial.map(center => ({
            ...center,
            distance: calculateDistance(defaultLocation.lat, defaultLocation.lng, center.lat, center.lng)
          })).sort((a, b) => a.distance! - b.distance!);
          setCenters(centersWithDistance);
        }
      );
    }
  }, []);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Filter centers based on search and material filter
  const filteredCenters = centers.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMaterial = selectedMaterial === '' || center.materials.includes(selectedMaterial);
    return matchesSearch && matchesMaterial;
  });

  const allMaterials = Array.from(new Set(baseCenters.flatMap(center => center.materials)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-secondary-50/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-800 via-cyan-5600 to-cyan-300 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center relative z-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/70 backdrop-blur-sm rounded-full mb-8 animate-bounce-slow">
              <Recycle className="h-10 w-10 text-primary-600" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              {t('home.title')}
            </h1>
            <p className="text-2xl md:text-3xl mb-10 opacity-90 animate-slide-up">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/map"
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 hover:shadow-glow transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105"
              >
                <MapPin className="h-5 w-5 mr-2" />
                {t('home.viewMap')}
              </Link>
              <Link
                to="/add-center"
                className="border-2 border-white/80 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105 backdrop-blur-sm"
              >
                <Recycle className="h-5 w-5 mr-2" />
                {t('home.addCenter')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
              <input
                type="text"
                placeholder="Nomi yoki manzil bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md"
              />
            </div>

            {/* Material Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <option value="">Barcha materiallar</option>
                {allMaterials.map(material => (
                  <option key={material} value={material}>{material}</option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1 text-primary-500" />
                {t('filters.foundCount', { count: filteredCenters.length })}
              </div>
              <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setShowMap(true)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${showMap ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md' : 'text-gray-700 hover:bg-white/70 hover:shadow-sm'}`}
                >
                  {t('common.map')}
                </button>
                <button
                  onClick={() => setShowMap(false)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${!showMap ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md' : 'text-gray-700 hover:bg-white/70 hover:shadow-sm'}`}
                >
                  {t('common.list')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Centers List */}
          <div className={`${showMap ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  {userLocation ? t('home.nearest') : t('home.centers')}
                </h2>
              </div>
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {filteredCenters.map((center) => (
                  <div
                    key={center.id}
                    className={`p-4 cursor-pointer hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 ${selectedCenter?.id === center.id ? 'bg-gradient-to-r from-primary-50 to-secondary-50 border-r-4 border-primary-500' : ''}`}
                    onClick={() => setSelectedCenter(center)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{center.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{center.address}</p>
                        {center.distance && (
                          <div className="flex items-center mt-1">
                            <Navigation className="h-3 w-3 text-primary-500 mr-1" />
                            <span className="text-xs text-primary-600 font-medium">
                              {center.distance.toFixed(1)} {t('common.km')}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {center.materials.slice(0, 2).map(material => (
                            <span key={material} className={`px-2 py-1 text-[11px] rounded-full ${materialColors[material] || 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'}`}>
                              {material}
                            </span>
                          ))}
                          {center.materials.length > 2 && (
                            <span className="px-2 py-1 text-[11px] rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600">
                              +{center.materials.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{center.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          {showMap && (
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-96 lg:h-[600px] border border-gray-100">
                <Map
                  centers={filteredCenters}
                  selectedCenter={selectedCenter}
                  onCenterSelect={setSelectedCenter}
                  userLocation={userLocation}
                />
              </div>

              {/* Center Details */}
              {selectedCenter && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg mt-4 p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedCenter.name}</h3>
                      <p className="text-gray-600 mt-1">{selectedCenter.address}</p>
                      {selectedCenter.distance && (
                        <div className="flex items-center mt-2">
                          <Navigation className="h-4 w-4 text-primary-500 mr-1" />
                          <span className="text-sm text-primary-600 font-medium">
                            {selectedCenter.distance.toFixed(1)} {t('common.km_away')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-medium text-gray-700">{selectedCenter.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{selectedCenter.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-700">{selectedCenter.hours}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-700">{selectedCenter.phone}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">{t('common.materialsAccepted')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCenter.materials.map(material => (
                        <span key={material} className={`px-3 py-1 text-sm rounded-full ${materialColors[material] || 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'}`}>
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-glow">
                      {t('common.getDirections')}
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-4 py-3 rounded-xl hover:from-secondary-600 hover:to-accent-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-glow-blue">
                      {t('common.call')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Full width list when map is hidden */}
          {!showMap && (
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCenters.map((center) => (
                <div key={center.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{center.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{center.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{center.address}</p>
                    
                    {center.distance && (
                      <div className="flex items-center mb-3">
                        <Navigation className="h-4 w-4 text-primary-500 mr-1" />
                        <span className="text-sm text-primary-600 font-medium">
                          {center.distance.toFixed(1)} km
                        </span>
                      </div>
                    )}

                    <p className="text-gray-700 text-sm mb-4">{center.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-xs text-gray-600">{center.hours}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-xs text-gray-600">{center.phone}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {center.materials.map(material => (
                          <span key={material} className={`px-2 py-1 text-[11px] rounded-full ${materialColors[material] || 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'}`}>
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-2 text-sm rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                        Yo'nalish
                      </button>
                      <button className="bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-3 py-2 text-sm rounded-xl hover:from-secondary-600 hover:to-accent-600 transition-all duration-300 transform hover:scale-105 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500">
                        Qo'ng'iroq
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-white via-primary-50/50 to-secondary-50/50 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Bizning natijalarimiz
            </h2>
            <p className="text-gray-600">Atrof-muhitni muhofaza qilishda erishgan yutuqlarimiz</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-2">150+</div>
              <div className="text-gray-600">Qayta ishlash punktlari</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold bg-gradient-to-r from-secondary-500 to-accent-500 bg-clip-text text-transparent mb-2">50,000+</div>
              <div className="text-gray-600">Foydalanuvchilar</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent mb-2">2.5M kg</div>
              <div className="text-gray-600">Qayta ishlangan chiqindilar</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-gray-600">Mijozlar mamnunligi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}