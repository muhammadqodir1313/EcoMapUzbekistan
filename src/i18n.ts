import { useContext } from 'react';
import { I18nContext } from './main';

type Lang = 'uz';

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  uz: {
    'nav.home': "Bosh sahifa",
    'nav.map': "Xarita",
    'nav.add': "Punkt qo'shish",
    'nav.about': "Biz haqimizda",
    'nav.contact': "Aloqa",
    'tagline': "Qayta ishlash punktlari",

    'home.title': "Chiqindilarni to'g'ri qayta ishlang",
    'home.subtitle': "Eng yaqin qayta ishlash punktlarini toping va atrof-muhitni muhofaza qiling",
    'home.viewMap': "Xaritada ko'rish",
    'home.addCenter': "Yangi punkt qo'shish",
    'home.nearest': "Eng yaqin punktlar",
    'home.centers': "Qayta ishlash punktlari",

    'filters.searchPlaceholder': "Nomi yoki manzil bo'yicha qidirish...",
    'filters.allMaterials': "Barcha materiallar",
    'filters.foundCount': "{count} ta punkt topildi",
    'common.map': "Xarita",
    'common.list': "Ro'yxat",
    'common.km': "km",
    'common.km_away': "km masofada",
    'common.materialsAccepted': "Qabul qilinadigan materiallar:",
    'common.getDirections': "Yo'nalish olish",
    'common.call': "Qo'ng'iroq qilish",
    'common.directions': "Yo'nalish",
    'common.call_short': "Qo'ng'iroq",

    'stats.title': "Bizning natijalarimiz",
    'stats.centers': "Qayta ishlash punktlari",
    'stats.users': "Foydalanuvchilar",
    'stats.recycled': "Qayta ishlangan chiqindilar",
    'stats.satisfaction': "Mijozlar mamnunligi",

    'contact.title': "Biz bilan bog'laning",
    'contact.info': "Aloqa ma'lumotlari",
    'contact.phone': "Telefon",
    'contact.email': "Email",
    'contact.address': "Manzil",
    'contact.hours': "Ish vaqti",
    'contact.formTitle': "Xabar yuborish",
    'contact.name': "Ism va familiya *",
    'contact.namePlaceholder': "Ismingizni kiriting",
    'contact.emailLabel': "Email manzil *",
    'contact.emailPlaceholder': "email@example.com",
    'contact.subject': "Mavzu *",
    'contact.message': "Xabar *",
    'contact.messagePlaceholder': "Xabaringizni batafsil yozing...",
    'contact.send': "Xabar yuborish",
    'contact.location': "Bizning joylashuvimiz",
    'contact.office': "Ofis joylashuvi",
    'contact.subtitle': "Savollaringiz, takliflaringiz yoki yordam kerak bo'lsa, biz bilan bog'laning",
    'contact.faq.title': "Tez-tez so'raladigan savollar",
    'contact.faq.q1': "Platformadan foydalanish bepulmi?",
    'contact.faq.a1': "Ha, bizning platforma to'liq bepul va barcha funksiyalar ochiq.",
    'contact.faq.q2': "Yangi punkt qo'shish uchun nima qilish kerak?",
    'contact.faq.a2': "\"Punkt qo'shish\" sahifasiga o'ting va formani to'ldiring.",
    'contact.faq.q3': "Ma'lumotlar qanchalik tez yangilanadi?",
    'contact.faq.a3': "Ma'lumotlar har kuni yangilanadi va tekshiriladi.",
    'contact.selectSubject': "Mavzuni tanlang",
    'contact.subjectGeneral': "Umumiy savol",
    'contact.subjectTechnical': "Texnik yordam",
    'contact.subjectSuggestion': "Taklif",
    'contact.subjectComplaint': "Shikoyat",
    'contact.subjectPartnership': "Hamkorlik",
    'contact.subjectOther': "Boshqa",
    'contact.hoursDetail1': "Dushanba - Juma: 09:00 - 18:00",
    'contact.hoursDetail2': "Shanba: 09:00 - 14:00",
    'contact.hoursDetail3': "Yakshanba: Dam olish",
    'contact.addressDetail': "Farg'ona shahar, Mustaqillik ko'chasi 183-uy",
    'contact.successTitle': "Xabar yuborildi!",
    'contact.successMessage': "Sizning xabaringiz muvaffaqiyatli yuborildi. Tez orada javob beramiz.",
    'contact.autoClose': "Bu oyna 3 soniyadan so'ng avtomatik yopiladi...",

    'about.title': "Biz haqimizda",
    'about.mission': "Bizning missiyamiz",
  },
};

function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return template.replace(/\{(.*?)\}/g, (_, k) => String(params[k] ?? ''));
}

export function useT() {
  const { lang } = useContext(I18nContext);
  return (key: string, params?: Record<string, string | number>) => {
    const l = 'uz';
    const value = translations[l][key] ?? key;
    return interpolate(value, params);
  };
}


