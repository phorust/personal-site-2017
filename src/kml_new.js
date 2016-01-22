/* thanks for peeking at the source!
 * you can find it in likely nicer form at
 * github.com/phorust/phorust.github.io
 */

var minimize   = modules.term.minimize;
var unminimize = modules.term.unminimize;
var activate   = modules.visual.activate;
var deactivate = modules.visual.deactivate;

var history  = window.History.createHistory();
var unlisten = _=>{};

function handleNav(pathname) {
  console.log('nav');
  if (pathname === "/visual" ||
      pathname === "/visual.html") {
    navVisual();
  } else if (pathname === "/software" ||
             pathname === "/software.html") {
    navSoftware();
  } else if (pathname === "/about" ||
             pathname === "/about.html" ||
             pathname === "/") {
    navAbout();
  }
}

function navAbout() {
  minimize();
  hideVisual();
  showAbout();
}
function navSoftware() {
  hideVisual();
  hideAbout();
  unminimize();
}
function navVisual() {
  minimize();
  hideAbout();
  showVisual();
}

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
    .css('min-height', $(window).height() * 0.60);
}

function showVisual() {
  $('#content').css('min-height', $('#visual_content').innerHeight());
  $('#visual_content').fadeIn(1).addClass('loaded');
  $('body').addClass('visual');
  $('#logo').attr('src', 'i/kl_white.png');

  activate();
}

function hideVisual() {
  // sigh DRY. see hideAbout
  $('#visual_content').removeClass('loaded').delay(300).fadeOut(1);
  $('body').animate({scrollTop: 0}, 300)
           .removeClass('visual');
  $('#logo').attr('src', 'i/kl.png');

  deactivate();
}

$(document).ready(function() {
  $('#wrapper').addClass('loaded');

  /* attr selectors for href? */
  $('.software').click(e => {
    navSoftware();
    history.push({ pathname: '/software' });
  });
  $('.about').click(e => {
    navAbout();
    history.push({ pathname: '/' });
  });
  $('.visual').click(e => {
    navVisual();
    history.push({ pathname: '/visual' });
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

  // load the right view on pageload
  var unlisten = history.listen(location => {
    handleNav(location.pathname);
  });
});


// for uptime
window.startTime = Date.now();
module.exports('kml_new', { showAbout });
