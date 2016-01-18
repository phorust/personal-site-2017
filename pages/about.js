import React, { Component } from 'react';

export default class extends Component {

  render() {
    return (
      <div id='about_content'>
        <h1 id='title'>Hello! I'm Kevin Lee,</h1>
        <h2 id='subtitle'>
          a <a class='software' href='software.html'>software engineer</a>
          { } and <a class='visual' href='visual.html'>designer</a> from the Bay Area.
        </h2>
        <p>
          I'm finishing my last year at
          { } <a id='berkeley' target="_blank" href='http://berkeley.edu'>UC Berkeley</a>
          { } right now.
          Last summer, I wrote code for
          { } <a id='facebook' target="_blank" href='http://facebook.com'>Facebook</a>,
          and I've also worked at
          { } <a id='bigfix' target="_blank" href='http://ibm.com/security/bigfix/'>IBM BigFix</a>.
        </p>
        <br/>
        <p>The last few lines of code I wrote look like <a href="javascript:;" id="recent_code_show">this:</a></p>
        <a id='recent_code_link' target="_blank"><pre><code id='recent_code' class='hljs diff'></code></pre></a>
      </div>
    );
  }

}
