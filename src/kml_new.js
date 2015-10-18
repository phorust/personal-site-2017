/* thanks for peeking at the source!
 * you can find it in likely nicer form at
 * github.com/phorust/phorust.github.io
 */

var minimize   = modules.term.minimize;
var unminimize = modules.term.unminimize;

function hideAbout() {
  $('#about_content').removeClass('loaded').delay(300).fadeOut(1);

  // otherwise jumping occurs as the huge about_content div is replaced by the
  // smaller terminal div
  $('body').animate({scrollTop: 0}, 300);
}

function showAbout() {
  $('#about_content').fadeIn(1).addClass('loaded');
  $('#about_content > a > pre')
    .css('max-height', $('#recent_code').outerHeight(true));
  // always try to place KL in the same place, slightly above middle
  $('#content')
    .css('min-height', Math.min($(window).height() * 0.60));
}

function showVisual() {
  $('#content').addClass('wide');
  $('#visual_content').fadeIn(1).addClass('loaded');
}

function hideVisual() {
  $('#content').removeClass('wide');
  // sigh DRY. see hideAbout
  $('#visual_content').removeClass('loaded').delay(300).fadeOut(1);
  $('body').animate({scrollTop: 0}, 300);
}

$(document).ready(function() {
  $('#wrapper').addClass('loaded');
  showAbout();

  /* attr selectors for href? */
  $('.software').click(e => {
    hideVisual();
    hideAbout();
    unminimize();
  });
  $('.about').click(e => {
    minimize();
    hideVisual();
    showAbout();
  });
  $('.visual').click(e => {
    minimize();
    hideAbout();
    showVisual();
  });
  $('nav a').click(e => {
    e.preventDefault();
  });
  $('#subtitle a').click(e => {
    e.preventDefault();
  });

  $('#recent_code_show').click(e => {
    $('#recent_code').toggleClass('active');
  });
});


// for uptime
window.startTime = Date.now();
module.exports('kml_new', { showAbout });
