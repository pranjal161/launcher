import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import * as en from './locales/en/en.json';
import * as fr from './locales/fr/fr.json';
import * as nl from './locales/nl/nl.json';


const resources = {
  en: { translation: en.en },
  fr: { translation: fr.fr },
  nl: { translation: nl.nl }
};

const languages = ['nl', 'fr', 'en'];

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "fr",
    resources,
    fallbackLng: "fr", // use en if detected lng is not available
    whitelist: languages,
    saveMissing: false, // send not translated keys to endpoint

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: true
  }
  });

  console.log(i18n);

export default i18n;