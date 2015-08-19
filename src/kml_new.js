/* thanks for peeking at the source!
 * you can find it in likely nicer form at
 * github.com/phorust/phorust.github.io
 */
function hideAbout() {
  $('#about_content')
    .removeClass('loaded')
    .css('max-height', 0);
}

function toggleAbout() {
  $('#about_content')
    .toggleClass('loaded')
    .css('max-height',
         $('#about_content').hasClass('loaded')
           // TODO: no more hacky +43 guessing on height
           ? $('#recent_code').height() + 43
           : 0
        );
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
