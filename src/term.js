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
  $('#minimize').click(e => {
    minimize();
    // should we show the about section?
    // or minimize to the bar or an icon?
  });
  $('#output').click(e => {
    $('#lastline > input').focus();
  });
  $('#term-project-link').click(e => {
    $('#lastline > input').val('ls ~/projects');
    $('#lastline > input').focus();
    // send enter
    $('#lastline > input').trigger(jQuery.Event('keyup', { which: 13, keyCode: 13 }));
  });
});

module.exports('term', {
  PROMPT,
  WIDTH,
  minimize,
  unminimize,
});
