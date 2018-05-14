import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const Menu = props => (
  <Link to={{pathname: props.menuHref}}>
    {props.children}
    <div className="navMenu">{props.menuContent}</div>
  </Link>
);

const Topbar = props => (
  <div className={`topbar + ${props.black ? 'black' : ''}`}>
    <div className="nameplate">mngyuan 梦远</div>
    <nav>
      <Menu
        menuHref="/photos/but you"
        menuContent={
          <div>
            <NavLink to={{pathname: `/photos/before`}}>before </NavLink>
            <br />
            <NavLink to={{pathname: `/photos/family`}}>family </NavLink>
            <br />
            <NavLink to={{pathname: `/photos/but you`}}>but you </NavLink>
          </div>
        }
      >
        people
      </Menu>
      {' · '}
      <Menu
        menuHref="/photos/asian"
        menuContent={
          <div>
            <NavLink to={{pathname: `/photos/asian`}}>asia</NavLink>
            <br />
            <NavLink to={{pathname: `/photos/americana`}}>americana</NavLink>
            <br />
            <NavLink to={{pathname: `/photos/the drive home`}}>
              the drive home
            </NavLink>
            <br />
            <NavLink to={{pathname: `/photos/iceland`}}>iceland</NavLink>
          </div>
        }
      >
        places
      </Menu>
      {' · '}
      <a
        href="https://soundcloud.com/mngyuan/sets/things-i-never-said-to-you-beattape"
        target="_blank"
        rel="noopener noreferrer"
      >
        mix
      </a>
      {' · '}
      <Menu
        menuContent={
          <div>
            <NavLink to={{pathname: `/stories/oakland just yesterday`}}>
              oakland, just yesterday
            </NavLink>
            <br />
            <NavLink to={{pathname: `/stories/ghosts`}}>ghosts</NavLink>
            <br />
          </div>
        }
        menuHref="/stories/oakland just yesterday"
      >
        story
      </Menu>
      {' · '}
      <Link to={{pathname: '/about'}}>about</Link>
    </nav>
  </div>
);

export default Topbar;
