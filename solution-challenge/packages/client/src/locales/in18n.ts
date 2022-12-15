import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import * as langs from "./langs";

const resources = {
  en: {
    translation: langs.en,
  },
  vi: {
    translation: langs.vi,
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", //def
  });
export default i18next;
