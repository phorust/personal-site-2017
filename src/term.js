var PROMPT = '<span class="prompt_path">~</span> <span class="prompt_arrow">&#x2192;</span> ';

function minimize() {
  $('#term').show().toggleClass('loaded');
}

$(document).ready(_ => {
  $('#minimize').click(function(e) {
    minimize();
  });
});

window.PROMPT = PROMPT;
window.minimize = minimize;
