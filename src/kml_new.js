/* thanks for peeking at the source!
 * you can find it in likely nicer form at
 * github.com/phorust/phorust.github.io
 */
function hideAbout() {
  $('#about_content').removeClass('loaded').delay(300).fadeOut(1);

  // otherwise jumping occurs as the huge about_content div is replaced by the
  // smaller terminal div
  $('body').animate({scrollTop: 0}, 300);
}

function showAbout() {
  // min-height won't actually accommodate all the code...
  // but it will look better this way anyway.
  $('#about_content').show().addClass('loaded');
  $('#about_content > a > pre')
    .css('max-height', $('#recent_code').outerHeight(true));
  // always try to place KL in the same place, slightly above middle
  $('#content')
    .css('min-height', Math.min($(window).height() * 0.35));
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
