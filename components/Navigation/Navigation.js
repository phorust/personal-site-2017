import React from 'react';
import './Navigation.scss';
import Link from '../Link';

function Navigation() {
  return (
    <nav>
      <ul role="menu">
        <li><a className='about' href='/about' onClick={Link.handleClick}>A B O U T</a></li>
        <li><a className='software' href='/software' onClick={Link.handleClick}>C O D E</a></li>
        <li><a className='visual' href='/visual' onClick={Link.handleClick}>V I S U A L</a></li>
        <li><a className='blog' href='/blog' onClick={Link.handleClick}>B L O G</a></li>
      </ul>
    </nav>

    // <ul className="Navigation" role="menu">
    //   <li className="Navigation-item">
    //     <a className="Navigation-link" href="/" onClick={Link.handleClick}>Home</a>
    //   </li>
    //   <li className="Navigation-item">
    //     <a className="Navigation-link" href="/about" onClick={Link.handleClick}>About</a>
    //   </li>
    // </ul>
  );
}

export default Navigation;
