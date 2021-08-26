import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Header = ({ user, logout }) => (
  (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/" className="navbar-brand">Hexlet Chat</Link>
        {user && <Button onClick={logout}>Выйти</Button>}
      </div>
    </nav>
  )
);

export default Header;
