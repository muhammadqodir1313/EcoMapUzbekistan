import React from 'react';
import { useT } from '../i18n';
import { Recycle, Target, Users, Globe, Award, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import muhammadqodirImg from '../images/muhammadqodir.jpg';
import dilshodbekImg from '../images/dilshodbek.png';
import mavludaxonImg from '../images/mavludaxon.png';

export default function AboutPage() {
  const t = useT();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-cyan-300 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="bg-white/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Recycle className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('about.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              EcoMap Uzbekistan - bu atrof-muhitni muhofaza qilish va chiqindilarni to'g'ri qayta ishlash uchun yaratilgan platforma
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.mission')}</h2>
              <p className="text-lg text-gray-700 mb-6">
                Biz O'zbekistonda ekologik ongni oshirish va chiqindilarni qayta ishlash madaniyatini rivojlantirish uchun ishlaymiz. 
                Har bir fuqaro o'z hududidagi qayta ishlash punktlarini osongina topishi va atrof-muhitni muhofaza qilishda 
                faol ishtirok etishi uchun qulay platforma yaratdik.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Target className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Maqsadimiz</h3>
                    <p className="text-gray-600">Chiqindilarni qayta ishlash jarayonini sodda va qulay qilish</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Jamiyat</h3>
                    <p className="text-gray-600">Ekologik masalalar bo'yicha xalqni birlashtirishga yordam berish</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="h-6 w-6 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Kelajak</h3>
                    <p className="text-gray-600">Kelgusi avlodlar uchun toza va sog'lom muhit yaratish</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Bizning qadriyatlarimiz</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Atrof-muhitga mas'uliyat</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Innovatsiya va texnologiya</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Jamiyat bilan hamkorlik</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Shaffoflik va ishonch</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bizning yutuqlarimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Platformamiz orqali erishgan natijalar va atrof-muhitga qo'shgan hissamiz
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Recycle className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-gray-600">Qayta ishlash punktlari</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Faol foydalanuvchilar</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2.5M kg</div>
              <div className="text-gray-600">Qayta ishlangan chiqindilar</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">Mijozlar mamnunligi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bizning jamoamiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ekologiya va texnologiya sohasidagi mutaxassislardan iborat jamoamiz
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                <img src={muhammadqodirImg} alt="Abdullajonov Muhammadqodir" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Abdullajonov Muhammadqodir</h3>
              <p className="text-gray-600 mb-2">Full Stack dasturchi</p>
              <p className="text-sm text-gray-500">Web dasturlash mutaxassisi</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                <img src={dilshodbekImg} alt="Primberdiyev Dilshodbek" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Primberdiyev Dilshodbek</h3>
              <p className="text-gray-600 mb-2">Flutter Dasturchi</p>
              <p className="text-sm text-gray-500">Mobil ilovalar yaratish mutaxassisi</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                <img src={mavludaxonImg} alt="Po'latova Mavludaxon" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Po'latova Mavludaxon</h3>
              <p className="text-gray-600 mb-2">Marketing menejeri va dizayner</p>
              <p className="text-sm text-gray-500">Ekologik loyihalarni targ'ib qilish va jamiyat bilan ishlash va loyiha dizaynini ishlab chiqish</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bizga qo'shiling!</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Atrof-muhitni muhofaza qilish va chiqindilarni to'g'ri qayta ishlash uchun birgalikda harakat qilaylik
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/add-center"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Punkt qo'shish
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center"
            >
              Bog'lanish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}