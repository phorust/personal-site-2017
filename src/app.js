import React from 'react';
import styles from './index.scss';

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.theOne}>
        <span>Kevin writes, takes photos, and illustrates, sometimes, in that order. Often what he writes is code, but sometimes, it isn't. Sometimes that stuff makes it in things. Right now, he's trying to figure out how to enjoy something without worrying about being good at it. And how to be himself and who that is.</span>
        <div className={styles.line}></div>
        <b>Heading</b>
      </div>
    )
  }
}
