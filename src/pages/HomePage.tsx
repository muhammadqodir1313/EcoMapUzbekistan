import { useT } from '../i18n';
import { Link } from 'react-router-dom';
import { MapPin, Recycle, Users, Award, Leaf, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const t = useT();

  const features = [
    {
      icon: MapPin,
      title: "Eng yaqin punktlarni toping",
      description: "GPS orqali eng yaqin qayta ishlash punktlarini aniqlang"
    },
    {
      icon: Recycle,
      title: "Barcha materiallar",
      description: "Plastik, qog'oz, metall, shisha va boshqa materiallarni qabul qilamiz"
    },
    {
      icon: Users,
      title: "Jamiyat bilan",
      description: "Atrof-muhitni muhofaza qilishda birga ishlaymiz"
    }
  ];

  const stats = [
    { number: "150+", label: "Qayta ishlash punktlari", icon: MapPin },
    { number: "50,000+", label: "Foydalanuvchilar", icon: Users },
    { number: "2.5M kg", label: "Qayta ishlangan chiqindilar", icon: Recycle },
    { number: "95%", label: "Mijozlar mamnunligi", icon: Award }
  ];

  const benefits = [
    "Atrof-muhitni muhofaza qiling",
    "Tabiiy resurslarni tejang", 
    "Iqtisodiy foyda oling",
    "Kelajak avlod uchun yaxshi dunyo qoldiring"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-cyan-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <Recycle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/map"
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105 shadow-lg"
              >
                <MapPin className="h-5 w-5 mr-2" />
                {t('home.viewMap')}
              </Link>
              <Link
                to="/add-center"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105"
              >
                <Recycle className="h-5 w-5 mr-2" />
                {t('home.addCenter')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nima uchun EcoMap?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Qayta ishlashni oson va qulay qilamiz
            </p>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-green-600" />
            </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Qayta ishlashning afzalliklari
                </h2>
              <p className="text-xl text-gray-600 mb-8">
                Chiqindilarni qayta ishlash orqali atrof-muhit va iqtisodiyotga katta hissa qo'shing
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-2xl">
              <div className="text-center">
                <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Atrof-muhitni muhofaza qiling</h3>
                <p className="text-gray-600">
                  Har bir qayta ishlangan material atrof-muhitni ifloslanishdan saqlaydi va tabiiy resurslarni tejaydi.
                </p>
              </div>
            </div>
            </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('stats.title')}
            </h2>
            <p className="text-xl opacity-90">
              Atrof-muhitni muhofaza qilishda erishgan yutuqlarimiz
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
            </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
            </div>
            ))}
            </div>
            </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Bugun boshlang!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Eng yaqin qayta ishlash punktini toping va atrof-muhitni muhofaza qilishda qatnashing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/map"
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105 shadow-lg"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Xaritada ko'rish
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link
              to="/about"
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105"
            >
              Ko'proq ma'lumot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}