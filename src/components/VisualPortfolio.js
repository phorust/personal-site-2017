import React from 'react';

let VisualPortfolio = React.createClass({
  render() {
    return (
      <div id='visual_content'>
        <a className='active'>photography</a><br/>
        <a>logos</a><br/>
        <a>innovative design</a><br/>
        <a>guitars</a>
      </div>
    );
  }
});

export default VisualPortfolio;
