import React, { useState } from 'react';
import { useT } from '../i18n';
import { MapPin, Clock, Phone, Plus, X, Check } from 'lucide-react';

const materialOptions = [
  "Plastik", "Qog'oz", "Metall", "Shisha", "Elektron chiqindilar", 
  "Batareyalar", "Organik chiqindilar", "Karton", "Tekstil", "Yog'lar"
];

export default function AddCenterPage() {
  const t = useT();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    hours: '',
    description: '',
    materials: [] as string[],
    lat: '',
    lng: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMaterialToggle = (material: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Persist to localStorage so it appears on the map immediately
    try {
      const existing = JSON.parse(localStorage.getItem('customCenters') || '[]');
      const newCenter = {
        id: Date.now(),
        name: formData.name.trim(),
        address: formData.address.trim(),
        lat: formData.lat ? parseFloat(formData.lat) : null,
        lng: formData.lng ? parseFloat(formData.lng) : null,
        phone: formData.phone.trim(),
        hours: formData.hours.trim(),
        materials: formData.materials,
        description: formData.description.trim(),
        rating: 4.5,
      };

      // Only save if coordinates provided
      if (newCenter.lat !== null && newCenter.lng !== null) {
        const updated = Array.isArray(existing) ? [...existing, newCenter] : [newCenter];
        localStorage.setItem('customCenters', JSON.stringify(updated));
      }
    } catch (_) {
      // ignore storage errors
    }

    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        address: '',
        phone: '',
        hours: '',
        description: '',
        materials: [],
        lat: '',
        lng: ''
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Muvaffaqiyatli yuborildi!</h2>
          <p className="text-gray-600 mb-4">
            Sizning so'rovingiz qabul qilindi. Tez orada ko'rib chiqiladi va tasdiqlangandan so'ng xaritada ko'rsatiladi.
          </p>
          <p className="text-sm text-gray-500">
            Bu oyna 3 soniyadan so'ng avtomatik yopiladi...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Yangi qayta ishlash punktini qo'shish
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sizning hududingizdagi qayta ishlash punktini qo'shing va boshqa foydalanuvchilarga yordam bering. 
            Barcha ma'lumotlar tekshirilgandan so'ng xaritada ko'rsatiladi.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Asosiy ma'lumotlar
              </h2>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nomi *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Masalan: EcoCenter Tashkent"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Manzil *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="To'liq manzilni kiriting"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-1">
                    Kenglik (Latitude)
                  </label>
                  <input
                    type="number"
                    id="lat"
                    name="lat"
                    step="any"
                    value={formData.lat}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="41.2995"
                  />
                </div>
                <div>
                  <label htmlFor="lng" className="block text-sm font-medium text-gray-700 mb-1">
                    Uzunlik (Longitude)
                  </label>
                  <input
                    type="number"
                    id="lng"
                    name="lng"
                    step="any"
                    value={formData.lng}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="69.2401"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Aloqa ma'lumotlari
              </h2>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon raqami *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="+998 71 123 45 67"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                  Ish vaqti *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="hours"
                    name="hours"
                    required
                    value={formData.hours}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Dushanba-Juma: 09:00-18:00"
                  />
                </div>
              </div>
            </div>

            {/* Materials */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Qabul qilinadigan materiallar *
              </h2>
              <p className="text-sm text-gray-600">
                Qaysi turdagi chiqindilarni qabul qilishingizni belgilang
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {materialOptions.map(material => (
                  <label
                    key={material}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.materials.includes(material)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.materials.includes(material)}
                      onChange={() => handleMaterialToggle(material)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 mr-2 flex items-center justify-center ${
                      formData.materials.includes(material)
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {formData.materials.includes(material) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm">{material}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Qo'shimcha ma'lumot
              </h2>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Tavsif
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Qayta ishlash markazi haqida qo'shimcha ma'lumot..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Qo'shish
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <MapPin className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">Ma'lumot</h3>
              <p className="text-sm text-blue-700 mt-1">
                Yuborilgan ma'lumotlar moderatsiya jarayonidan o'tadi. Tasdiqlangandan so'ng 
                qayta ishlash punkti xaritada ko'rsatiladi va foydalanuvchilar uchun mavjud bo'ladi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}