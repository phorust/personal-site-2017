import React, { Component } from 'react';
import '../components/visual.scss';

export default class extends Component {

  render() {
    return (
      <div id='visual_content'>
        <a class='active'>photography</a><br/>
        <a>logos</a><br/>
        <a>innovative design</a><br/>
        <a>guitars</a>
      </div>
    );
  }

}
