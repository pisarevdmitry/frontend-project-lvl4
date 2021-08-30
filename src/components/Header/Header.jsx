import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const Header = ({ user, logout }) => {
  const { t } = useTranslation();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/" className="navbar-brand">Hexlet Chat</Link>
        {user && <Button onClick={logout}>{t('buttons.logOut')}</Button>}
      </div>
    </nav>
  );
};

export default Header;
