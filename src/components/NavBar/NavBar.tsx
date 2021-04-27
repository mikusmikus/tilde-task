import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://cdn.worldvectorlogo.com/logos/tilde.svg"
          alt="logo"
        />
      </div>
      <ul className="list">
        <li className="item">
          <NavLink to="/" activeClassName="activeRoute" exact>Task 1</NavLink>
        </li>
        <li className="item">
          <NavLink to="/task-2" activeClassName="activeRoute">Task 2</NavLink>
        </li>
        <li className="item">
          <NavLink to="/task-3" activeClassName="activeRoute">Task 3</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
