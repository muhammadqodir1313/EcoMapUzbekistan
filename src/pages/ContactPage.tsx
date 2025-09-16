import React, { useState } from 'react';
import { useT } from '../i18n';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Check } from 'lucide-react';

export default function ContactPage() {
  const t = useT();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('contact.successTitle')}</h2>
          <p className="text-gray-600 mb-4">
            {t('contact.successMessage')}
          </p>
          <p className="text-sm text-gray-500">
            {t('contact.autoClose')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-cyan-600 to-cyan-300 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg">
              {t('contact.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('contact.info')}</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t('contact.phone')}</h3>
                    <p className="text-gray-600">+998 90 366 05 02</p>
                    <p className="text-gray-600">+998 90 277 86 31</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-secondary-100 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t('contact.email')}</h3>
                    <p className="text-gray-600">farhodjonovichm1301@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-accent-100 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t('contact.address')}</h3>
                    <p className="text-gray-600">
                      Farg'ona shahar, Mustaqillik ko'chasi 183-uy
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-solar-100 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-solar-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t('contact.hours')}</h3>
                    <p className="text-gray-600">{t('contact.hoursDetail1')}</p>
                    <p className="text-gray-600">{t('contact.hoursDetail2')}</p>
                    <p className="text-gray-600">{t('contact.hoursDetail3')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('contact.faq.title')}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{t('contact.faq.q1')}</h3>
                  <p className="text-sm text-gray-600">{t('contact.faq.a1')}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{t('contact.faq.q2')}</h3>
                  <p className="text-sm text-gray-600">{t('contact.faq.a2')}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{t('contact.faq.q3')}</h3>
                  <p className="text-sm text-gray-600">{t('contact.faq.a3')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <MessageCircle className="h-6 w-6 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">{t('contact.formTitle')}</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.emailLabel')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.subject')}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">{t('contact.selectSubject')}</option>
                    <option value="general">{t('contact.subjectGeneral')}</option>
                    <option value="technical">{t('contact.subjectTechnical')}</option>
                    <option value="suggestion">{t('contact.subjectSuggestion')}</option>
                    <option value="complaint">{t('contact.subjectComplaint')}</option>
                    <option value="partnership">{t('contact.subjectPartnership')}</option>
                    <option value="other">{t('contact.subjectOther')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {t('contact.send')}
                  </button>
                </div>
              </form>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('contact.location')}</h2>
              <div className="bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary-500 mx-auto mb-3" />
                  <p className="text-gray-700 font-medium">{t('contact.office')}</p>
                  <p className="text-sm text-gray-500 mt-1">{t('contact.addressDetail')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}