$(document).ready(function() {
  $('#wrapper').addClass('loaded');

  /* attr selectors for href? */
  $('nav a').click(function(e) {
    e.preventDefault();
    $('#term').show().toggleClass('loaded');
  });
});
