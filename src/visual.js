var bgs = {
  'guitars': ['i/guitar.png'],
  'innovative design': ['i/innod.jpg'],
  'logos': ['i/logo.png'],
  'photography': ['i/photos/allen.jpg',
                  'i/photos/jellyfish.jpg',
                  'i/photos/bleachers.jpg',
                  'i/photos/me.jpg',
                  // 'i/photos/christine.jpg',
                  // 'i/photos/twinpeaks.jpg',
                  'i/photos/lancy.jpg',
                  'i/photos/orange.jpg']
                  // 'i/photos/bridge.jpg',
                  // 'i/photos/wheeler.jpg']
};
var curImages = bgs['photography'];
var curImage = 0;
var intervalID;
var transitioning = false;
var callback = _ => {};

function changeBG(i) {
  $('#visual_bg').css('background-image', `url(${curImages[i]})`);
  transitioning = true;
  setTimeout(_ => { transitioning = false; callback(); }, 1900);
}

function mod(n,m) {
  return ((n%m)+m)%m;
}

function next() {
  if (transitioning) {
    console.log('qd a next');
    callback = _ => { console.log('next callback'); callback = _ => {}; next(); };
    return;
  }
  curImage = mod(curImage + 1, curImages.length);
  changeBG(curImage);
  // reset fade timing
  clearInterval(intervalID);
  intervalID = setInterval(next, 6000);
}
function prev() {
  if (transitioning) {
    console.log('qd a prev');
    callback = _ => { console.log('prev callback'); callback = _ => {}; prev(); };
    return;
  }
  curImage = mod(curImage - 1, curImages.length);
  changeBG(curImage);
  // reset fade timing
  clearInterval(intervalID);
  intervalID = setInterval(next, 6000);
}

function activate() {
  intervalID = setInterval(next, 6000);
  $(document).keydown(keyHandler);
}
function deactivate() {
  clearInterval(intervalID);
  $(document).unbind('keydown', keyHandler);
}

function keyHandler(e) {
  switch(e.which) {
    case 37: // left
      prev();
      break;
    case 39: // right
      next();
      break;
    default: return;
  }
  e.preventDefault();
}

function preloadImage(url)
{
  (new Image()).src = url;
}

$(document).ready(_ => {
  $('#visual_content a').click(function() {
    if (bgs[$(this).text()] == curImages) {
      next();
      return;
    }
    curImages = bgs[$(this).text()] || bgs['photography'];
    curImage = 0;
    changeBG(0);

    $('#visual_content a').removeClass('active');
    $(this).addClass('active');
  });

  for (var key in bgs) {
    for (var url of bgs[key]) {
      preloadImage(url);
    }
  }
});

module.exports('visual', {
  activate,
  deactivate,
});
