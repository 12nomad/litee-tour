import en from "@/translations/en.json";
import fr from "@/translations/fr.json";

const translations = {
  en: () => import("../translations/en.json").then((module) => module.default),
  fr: () => import("../translations/fr.json").then((module) => module.default),
};

const getDictionary = async (locale?: string) =>
  locale ? translations[locale as "en" | "fr"]() : translations["fr"]();

export default getDictionary;
