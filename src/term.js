var PROMPT = '<span class="prompt_path">~</span> <span class="prompt_arrow">&#x2192;</span> ';
var WIDTH = 63;

function minimize() {
  $('#term').removeClass('loaded').delay(300).fadeOut(1);
}

function unminimize() {
  $('#term').fadeIn(1).addClass('loaded');
  $('#content').css('min-height', $('#term').height());
}

function toggleMinimize() {
  $('#term').show().toggleClass('loaded');
}

$(document).ready(_ => {
  $('#minimize').click(function(e) {
    minimize();
  });
  $('#output').click(function(e) {
    $('#lastline > input').focus();
  });
});

window.PROMPT = PROMPT;
window.WIDTH = WIDTH;
window.minimize = minimize;
window.unminimize = unminimize;
