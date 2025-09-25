import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";

const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    }
};

i18next
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        resources,
        fallbackLng: "en", // langue par défaut
        interpolation: {
            escapeValue: false
        }
    })

export default i18next;