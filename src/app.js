import React from 'react';
import styles from './index.scss';

export default class App extends React.Component {
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
    // if (this.state.scrollDir == 'x') {
    //   e.preventDefault();
    //   window.scrollBy(e.deltaY, 0);
    // }
    console.log(e.deltaY);
  }

  render() {
    return (
      <div className={styles.container} onWheel={this._onWheel}>
        <div className={styles.kevin}>Kevin</div>
        <div className={styles.mngyuan}>梦远</div>
        <div className={styles.lee}>Lee</div>
        <div className={styles.page}>
          <div className={styles.theOne}>
            <span>Kevin writes code for facebook. He takes photos for fun. This site is under construction.</span>
            <div className={styles.line}></div>
            <b>Heading</b>
          </div>
        </div>
        <div
          className={[styles.page, styles.brutalism].join(' ')}
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
