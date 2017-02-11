import React from 'react';
import styles from './index.scss';

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.kevin}>Kevin</div>
        <div className={styles.mngyuan}>梦远</div>
        <div className={styles.lee}>Lee</div>
        <div className={styles.theOne}>
          <span>Kevin writes code for facebook. He takes photos for fun. This site is under construction.</span>
          <div className={styles.line}></div>
          <b>Heading</b>
        </div>
      </div>
    )
  }
}
