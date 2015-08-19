var PROMPT = '<span class="prompt_path">~</span> <span class="prompt_arrow">&#x2192;</span> ';

function minimize() {
  $('#term').show().removeClass('loaded');
}

function unminimize() {
  $('#term').show().addClass('loaded');
}

function toggleMinimize() {
  $('#term').show().toggleClass('loaded');
}

$(document).ready(_ => {
  $('#minimize').click(function(e) {
    toggleMinimize();
  });
});

window.PROMPT = PROMPT;
window.minimize = minimize;
window.unminimize = unminimize;
window.toggleMinimize = toggleMinimize;
