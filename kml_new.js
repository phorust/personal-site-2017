/* thanks for peeking at the source!
 * you can find it in likely nicer form at
 * github.com/phorust/phorust.github.io
 */

var startTime;

$(document).ready(function() {
  // for uptime
  startTime = Date.now();

  $('#wrapper').addClass('loaded');

  /* attr selectors for href? */
  $('nav a').click(function(e) {
    e.preventDefault();
    $('#term').show().toggleClass('loaded');
  });
});
