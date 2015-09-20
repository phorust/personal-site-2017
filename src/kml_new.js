/* thanks for peeking at the source!
 * you can find it in likely nicer form at
 * github.com/phorust/phorust.github.io
 */
function hideAbout() {
  $('#about_content').removeClass('loaded').delay(300).fadeOut(1);
}

function showAbout() {
  $('#about_content').show().addClass('loaded');
  $('#about_content > a > pre')
    .css('max-height', $('#recent_code').height());
  $('#content')
    .css('min-height', $('#about_content').outerHeight(true));
}

function toggleAbout() {
  var isLoaded = !$('#about_content').hasClass('loaded');
  $('#about_content')
    .toggleClass('loaded');
  $('#about_content > a > pre')
    .css('max-height',
         isLoaded ? $('#recent_code').height()
                  : 0
        );

  $('#content')
    .css('min-height', isLoaded ? $('#about_content').outerHeight(true)
                     : 'auto');
}

function checkContentOverflow() {
  var newHeight = $('#wrapper').height();
  if ($('#about_content').hasClass('loaded')) {
    newHeight += $('#about_content').outerHeight(true);
  } else {
    newHeight -= $('#about_content').outerHeight(true);
  }
  if (newHeight > $(window).height()) {
    $('#wrapper').addClass('full');
  } else {
    $('#wrapper').removeClass('full');
  }
}

$(document).ready(function() {
  $('#wrapper').addClass('loaded');
  toggleAbout();

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
    checkContentOverflow();
  });
  $('#subtitle a').click(e => {
    e.preventDefault();
    checkContentOverflow();
  });
});


// for uptime
window.startTime = Date.now();
