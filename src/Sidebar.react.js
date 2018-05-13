import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = props => (
  <div className={'theOne ' + props.className}>
    {props.children}
    <div className="theOneInner">
      <span>
        Kevin writes code. He takes photos and makes layouts and the occasional
        graphic.
        <br />
        <br />
        <a
          href="http://instagram.com/mngyuan"
          target="_blank"
          rel="noopener noreferrer"
        >
          @mngyuan
        </a>
      </span>
      <div className="line" />
      <Link to={{pathname: '/photos/but you'}}>PHOTO</Link>
      {' · '}
      <a
        href="https://soundcloud.com/mngyuan/sets/things-i-never-said-to-you-beattape"
        target="_blank"
        rel="noopener noreferrer"
      >
        MIX
      </a>
      {' · '}
      <Link to={{pathname: '/stories/oakland just yesterday'}}>STORY</Link>
    </div>
  </div>
);

export default Sidebar;
