import React from 'react';
import logo from '../assets/img/news.png';
import { Link } from 'react-router-dom';
import { SearchBlock } from './SearchBlock';

export const Header: React.FC = () => {

  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="header__cart">
          <SearchBlock />
        </div>

      </div>
    </div>
  );
};
