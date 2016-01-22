import React from 'react';
import './Navigation.scss';
import Link from '../Link';

function Navigation() {
  return (
    <nav>
      <ul role="menu">
        <a className='about' href='/about' onClick={Link.handleClick}><li>A B O U T</li></a>
        <a className='software' href='/software' onClick={Link.handleClick}><li>C O D E</li></a>
        <a className='visual' href='/visual' onClick={Link.handleClick}><li>V I S U A L</li></a>
        <a className='blog' href='/blog' onClick={Link.handleClick}><li>B L O G</li></a>
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
