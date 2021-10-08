import React from 'react';
import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className="w-100 h-100 position-relative">
      <span className="position-absolute top-50 start-50 translate-middle">{t('loading')}</span>
    </div>
  );
};

export default Loader;
