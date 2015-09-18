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
  var isLoaded = !$('#about_content').hasClass('loaded');
  $('#about_content')
    .toggleClass('loaded')
    .css('max-height',
         // TODO: no more hacky +43 guessing on height
         // TODO: incorporate other elements height
         isLoaded ? $('#recent_code').height() + 43
                  : 0
        );
  $('#about_content > a > pre')
    .css('max-height',
         isLoaded ? $('#recent_code').height()
                  : 0
        );
}

function checkContentOverflow() {
  var newHeight = $('#wrapper').height();
  if ($('#about_content').hasClass('loaded')) {
    newHeight += $('#recent_code').height();
  } else {
    newHeight -= $('#recent_code').height();
  }
  if (newHeight > $(window).height()) {
    $('#wrapper').addClass('full');
  } else {
    $('#wrapper').removeClass('full');
  }
}

$(document).ready(function() {
  $('#wrapper').addClass('loaded');

  /* attr selectors for href? */
  $('#software').click(e => {
    window.toggleMinimize();
    hideAbout();
  });
  $('#about').click(e => {
    window.minimize();
    toggleAbout();
  });
  $('nav a').click(e => {
    e.preventDefault();
    checkContentOverflow();
  });
});


// for uptime
window.startTime = Date.now();
