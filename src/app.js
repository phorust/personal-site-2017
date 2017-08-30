import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './App.css';

import photo1 from './photos/film/01880014.jpg';
import photo2 from './photos/film/01880019.jpg';

const Empty = () => <div />;

class Photos extends React.Component {
  render() {
    window.photos = this;
    const photoElems = [<img src={photo1} />, <img src={photo2} />];
    return (
      <div className="photowrapper">
        {photoElems}
      </div>
    );
  }
}

const Mix = () =>
  <div className="page">
    <h3>hello</h3>
  </div>;

class App extends React.Component {
  state = {
    horizontalScroll: false,
  };

  constructor(props) {
    super(props);
    window.app = this;
  }

  _onWheel = e => {
    if (this.state.horizontalScroll) {
      e.preventDefault();
      window.scrollBy(e.deltaY, 0);
    } else {
      // console.log(e.deltaY);
    }
  };

  render() {
    const unused = (
      <div>
        <div className="kevin">Kevin</div>
        <div className="mngyuan">梦远</div>
        <div className="lee">Lee</div>
      </div>
    );
    return (
      <div className="container" onWheel={this._onWheel}>
        <div className="page">
          <div className="theOne">
            <span>
              Kevin writes code for facebook. He takes photos for fun. This site
              is under construction.
            </span>
            <div className="line" />
            <b>Heading</b>
            <br />
            <br />
            <Link to={{ pathname: '/photos' }}>
              PHOTO
            </Link>
            ·
            <Link to={{ pathname: '/mix/june' }}>MIX</Link>
          </div>
          <Route exact path="/" component={Empty} />
          <Route path="/photos" component={Photos} />
          <Route path="/mix/june" component={Mix} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
