var PROMPT = '<span class ="prompt_path">~</span> <span class ="prompt_arrow">&#x2192;</span> ';
var WIDTH  = 63;

function minimize() {
  $('#term_content').removeClass('loaded').delay(300).fadeOut(1);
}

function unminimize() {
  $('#term_content').fadeIn(1).addClass('loaded');
  $('#content').css('min-height', $('#term_content').height());
}

function toggleMinimize() {
  $('#term_content').show().toggleClass('loaded');
}

$(document).ready(_ => {
  $('#minimize').click(function(e) {
    minimize();
  });
  $('#output').click(function(e) {
    $('#lastline > input').focus();
  });
});

module.exports('term', {
  PROMPT,
  WIDTH,
  minimize,
  unminimize,
});
