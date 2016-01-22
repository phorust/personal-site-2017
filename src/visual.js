var bgs = {
  'guitars': ['i/guitar.png'],
  'innovative design': ['i/innod.jpg'],
  'logos': ['i/logo.png'],
  'photography': ['i/photos/chicago.jpg',
                  'i/photos/pam.jpg',
                  'i/photos/green.jpg',
                  'i/photos/christine.jpg',
                  'i/photos/white.jpg',
                  'i/photos/jellyfish.jpg',
                  'i/photos/bleachers.jpg',
                  'i/photos/allen.jpg',
                  'i/photos/red.jpg',
                  'i/photos/seattle.jpg',
                  'i/photos/orange.jpg']
};
var curImages = bgs['photography'];
var curImage = 0;
var intervalID;
var TRANSTIME = 1200 + 100;
var state = 'still';
// false for no key pressed during trans, 1 for next, -1 for prev
var keyWasPressed = false;
var changeWasRequested = false;

function stateChange(action, dist) {
  if (state === 'still') {
    if (action === 'key' || action === 'change') {
      // reset fade timing
      clearInterval(intervalID);
      intervalID = setInterval(timeNext, 6000);
    }
    state = 'trans';
    setTimeout(_=>{ stateChange('time') }, TRANSTIME);
    changeBG(mod(curImage + (dist || 1), curImages.length));
  } else if (state === 'trans') {
    if (action === 'time') {
      if (keyWasPressed) {
        clearInterval(intervalID);
        intervalID = setInterval(timeNext, 6000);
        state = 'trans';
        setTimeout(_=>{ stateChange('time') }, TRANSTIME);
        changeBG(mod(curImage + keyWasPressed, curImages.length));
        keyWasPressed = false;
      } else if (changeWasRequested) {
        clearInterval(intervalID);
        intervalID = setInterval(timeNext, 6000);
        state = 'trans';
        setTimeout(_=>{ stateChange('time') }, TRANSTIME);
        changeBG(mod(curImage + 1, curImages.length));
        changeWasRequested = false;
      } else {
        state = 'still';
      }
    } else if (action === 'key') {
      keyWasPressed = dist || 1;
    } else if (action === 'change') {
      changeWasRequested = true;
    }
  }
}

function changeBG(i) {
  $('#visual_bg').css('background-image', `url(${curImages[i]})`);
  curImage = i;
}

function mod(n,m) {
  return ((n%m)+m)%m;
}

function timeNext() {
  stateChange('time');
}
function keyNext() {
  stateChange('key');
}
function keyPrev() {
  // jank, i should encapsulate in action obj
  stateChange('key', -1);
}
function clickNext() {
  keyNext();
}
function clickPrev() {
  keyPrev();
}

function activate() {
  console.log('activate');
  intervalID = setInterval(timeNext, 6000);
  $(document).keydown(keyHandler);
}
function deactivate() {
  console.log('deactivate');
  clearInterval(intervalID);
  $(document).unbind('keydown', keyHandler);
}

function keyHandler(e) {
  switch(e.which) {
    case 37: // left
      keyPrev();
      break;
    case 39: // right
      keyNext();
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
      clickNext();
      return;
    }
    curImages = bgs[$(this).text()] || bgs['photography'];
    curImage = -1;
    $('#visual_content a').removeClass('active');
    $(this).addClass('active');
    stateChange('change');
  });

  $('#visual_content a.active::before').click(_ => {
    // this doesn't work I think
    clickPrev();
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
