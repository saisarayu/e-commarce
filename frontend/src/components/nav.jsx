import React from 'react';
import { FaCartArrowDown, FaHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='flex-justify-evenly'>
      <NavLink  to={"/"} >
      
       
        Home
      </NavLink>

      <NavLink to="/profile">
        Profile
      </NavLink>

      <NavLink to="/">
        <FaHeart />
      </NavLink>

      <NavLink to="/cart">
        <FaCartArrowDown />
      </NavLink>
    </nav>
  );
};

export default Nav;
