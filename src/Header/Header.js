import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./header.css";

export default function Header() {
  return (
      <>
    <header className='website-header'>
        <div className='logo'>
            <h2>Alrfati-Applications</h2>
        </div>
        <ul className='lists'>
            {/* <li>SIGNUP</li> */}
            <Link to='/to-do-list' ><li>TODO</li></Link>
            <Link to='/expense-tracker' ><li>EXPENSE TRACKER</li></Link>
        </ul>
    </header>
        <Outlet />
        </>
  );
}
