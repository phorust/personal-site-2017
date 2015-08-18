/* thanks for peeking at the source!
 * you can find it in likely nicer form at
 * github.com/phorust/phorust.github.io
 */

$(document).ready(function() {
  $('#wrapper').addClass('loaded');

  /* attr selectors for href? */
  $('nav a').click(function(e) {
    e.preventDefault();
    window.minimize();
  });
});


// for uptime
window.startTime = Date.now();
