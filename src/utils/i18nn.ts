import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: {
            welcome: "Welcome",
            edit_task: "Edit Task",
            create_task: "Create Task",
        },
    },
    es: {
        translation: {
            welcome: "Bienvenido",
            edit_task: "Editar Tarea",
            create_task: "Crear Tarea",
        },
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "es",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;