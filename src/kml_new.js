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
  $('#about_content').show().addClass('loaded');
  $('#about_content > a > pre')
    .css('max-height', $('#recent_code').outerHeight(true));
  // always try to place KL in the same place, slightly above middle
  $('#content')
    .css('min-height', Math.min($(window).height() * 0.60));
}

function showDesign() {
  $('#design_content').show().addClass('loaded');
}

function hideDesign() {
  // sigh DRY. see hideAbout
  $('#design_content').removeClass('loaded').delay(300).fadeOut(1);
  $('body').animate({scrollTop: 0}, 300);
}

$(document).ready(function() {
  $('#wrapper').addClass('loaded');
  showAbout();

  /* attr selectors for href? */
  $('.software').click(e => {
    hideDesign();
    hideAbout();
    unminimize();
  });
  $('.about').click(e => {
    minimize();
    hideDesign();
    showAbout();
  });
  $('.design').click(e => {
    minimize();
    hideAbout();
    showDesign();
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
module.exports('kml_new', { showAbout });
