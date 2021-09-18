import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ru, en } from './locales/index.js';

const create = () => {
  const i18Instance = i18n.createInstance();
  i18Instance
    .use(initReactI18next)
    .init({
      resources: { ru, en },
      lng: 'ru',
      fallbackLng: 'en',

      interpolation: {
        escapeValue: false,
      },
    });
};

export default create;
