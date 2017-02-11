import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {scrollDir: 'y'};

    this._onWheel = this._onWheel.bind(this);
  }

  _onWheel(e) {
    // console.log(this.brutalism.getBoundingClientRect());
    // const brutalismLoc = this.brutalism.getBoundingClientRect();
    // if (brutalismLoc.top < 1) {
    //   this.setState({scrollDir: 'x'});
    // }
    // if (this.state.scrollDir === 'x') {
    //   e.preventDefault();
    //   window.scrollBy(e.deltaY, 0);
    // }
    console.log(e.deltaY);
  }

  render() {
    return (
      <div className="container" onWheel={this._onWheel}>
        <div className="kevin">Kevin</div>
        <div className="mngyuan">梦远</div>
        <div className="lee">Lee</div>
        <div className="page">
          <div className="theOne">
            <span>Kevin writes code for facebook. He takes photos for fun. This site is under construction.</span>
            <div className="line"></div>
            <b>Heading</b>
          </div>
        </div>
        <div
          className="page brutalism"
          ref={(brutalism) => this.brutalism = brutalism}>
          <h1><a href="#">PHOTOS</a><br/></h1>
          <h1><a href="#">DIGITAL ILLUSTRATIONS</a><br/></h1>
          <h1><a href="#">SOFTWARE</a><br/></h1>
          <h1><a href="#">FAR TOO PERSONAL</a><br/></h1>
          <h1><a href="#">ABOUT</a><br/></h1>
          <h1><a href="#">OTHER</a><br/></h1>
        </div>
      </div>
    )
  }
}

export default App;
