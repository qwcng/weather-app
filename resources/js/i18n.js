import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

if (!i18n.isInitialized) {
  i18n
    .use(HttpApi)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      supportedLngs: ["en", "pl",'fr'],
      fallbackLng: "pl",

      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },

      backend: {
        loadPath: "/locales/{{lng}}/{{lng}}.json",
      },

      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;