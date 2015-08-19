/* thanks for peeking at the source!
 * you can find it in likely nicer form at
 * github.com/phorust/phorust.github.io
 */
function hideAbout() {
 $('#about_content').removeClass('loaded');
}

function toggleAbout() {
 $('#about_content').toggleClass('loaded');
}

$(document).ready(function() {
  $('#wrapper').addClass('loaded');

  /* attr selectors for href? */
  $('nav a').click(e => {
    e.preventDefault();
  });
  $('#software').click(e => {
    window.toggleMinimize();
    hideAbout();
  });
  $('#about').click(e => {
    window.minimize();
    toggleAbout();
  });
});


// for uptime
window.startTime = Date.now();
