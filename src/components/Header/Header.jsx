import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <Link to="/" className="navbar-brand">Hexlet Chat</Link>
    </div>
  </nav>
);

export default Header;
