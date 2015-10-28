var bgs = {
  'guitars': ['i/guitar.png'],
  'innovative design': ['i/innod.jpg'],
  'logos': ['i/logo.png'],
  'photography': ['i/me.jpg', 'i/insta.jpg'],

};
var curImages = bgs['photography'];
var curImage = 0;

function changeBG(i) {
  console.log(curImages[i]);
  $('#visual_bg').css('background-image', `url(${curImages[i]})`);
}

function mod(n,m) {
  return ((n%m)+m)%m;
}

$(document).ready(_ => {
  $(document).keydown(e => {
    switch(e.which) {
      case 37: // left
        curImage = mod(curImage - 1, curImages.length);
        changeBG(curImage);
        break;
      case 39: // right
        curImage = mod(curImage + 1, curImages.length);
        changeBG(curImage);
        break;
      default: return;
    }
    e.preventDefault();
  });

  $('#visual_content a').click(function() {
    curImages = bgs[$(this).text()] || bgs['photography'];
    curImage = 0;
    changeBG(0);
  });
});
