/* thanks for peeking at the source!
 * you can find it in likely nicer form at
 * github.com/phorust/phorust.github.io
 */
function hideAbout() {
  $('#about_content').removeClass('loaded').delay(300).fadeOut(1);
  $('#wrapper').removeClass('full');
}

function showAbout() {
  // min-height won't actually accommodate all the code...
  // but it will look better this way anyway.
  $('#about_content').show().addClass('loaded');
  $('#about_content > a > pre')
    .css('max-height', $('#recent_code').height());
  $('#content')
    .css('min-height', $('#about_content').outerHeight(true));
  if ($('#about_content').outerHeight(true) + 100 > $(window).height()) {
    $('#wrapper').addClass('full');
  }
}

$(document).ready(function() {
  $('#wrapper').addClass('loaded');
  showAbout();

  /* attr selectors for href? */
  $('.software').click(e => {
    window.unminimize();
    hideAbout();
  });
  $('.about').click(e => {
    window.minimize();
    showAbout();
  });
  $('nav a').click(e => {
    e.preventDefault();
  });
  $('#subtitle a').click(e => {
    e.preventDefault();
  });
});


// for uptime
window.startTime = Date.now();
window.showAbout = showAbout;
