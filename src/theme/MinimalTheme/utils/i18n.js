import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ----------------------------------------------------------------------

const options = {
  loadPath: '/locales/{{lng}}/{{ns}}.json'
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    debug: false,
    cleanCode: true,
    backend: options,
    react: {
      useSuspense: false
    }
  });

export default i18n;
