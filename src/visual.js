var bgs = {
  'guitars': ['/i/guitar.png'],
  'innovative design': ['/i/innod.jpg'],
  'design'     : ['/i/designs/portfolio2k16-03.png',
                  '/i/designs/portfolio2k16-04.png',
                  '/i/designs/portfolio2k16-09.png',
                  '/i/designs/portfolio2k16-07.png',
                  '/i/designs/portfolio2k16-05.png',
                  '/i/designs/portfolio2k16-11.png',
                  '/i/designs/portfolio2k16-06.png',
                  '/i/designs/portfolio2k16-08.png',
                  '/i/designs/portfolio2k16-01.png',
                  '/i/designs/portfolio2k16-10.png',
                  '/i/designs/portfolio2k16-02.png',
                  '/i/designs/portfolio2k16-12.png',
                  '/i/designs/portfolio2k16-13.png',
                  '/i/designs/portfolio2k16-14.png'],
  'photography': ['/i/photos/chicago.jpg',
                  '/i/photos/gabi.jpg',
                  '/i/photos/green.jpg',
                  '/i/photos/ingird.jpg',
                  '/i/photos/white.jpg',
                  '/i/photos/yudi.jpg',
                  '/i/photos/allen.jpg',
                  '/i/photos/bleachers.jpg',
                  '/i/photos/seattle.jpg',
                  '/i/photos/christine.jpg',
                  '/i/photos/sebastian.jpg',
                  '/i/photos/sonia.jpg',
                  '/i/photos/orange.jpg'],
  'grads'      : ['/i/photos/grad/DSC08283.jpg',
                  '/i/photos/grad/DSC01385.jpg',
                  '/i/photos/grad/DSC01681.jpg',
                  '/i/photos/grad/DSC06722.jpg',
                  '/i/photos/grad/DSC06812.jpg',
                  '/i/photos/grad/DSC05855.jpg',
                  '/i/photos/grad/DSC05512.jpg',
                  '/i/photos/grad/DSC07877.jpg',
                  '/i/photos/grad/DSC05140.jpg',
                  '/i/photos/grad/DSC06573.jpg',
                  '/i/photos/grad/DSC04325.jpg'],
  'film'       : ['/i/photos/film/01880008.jpg',
                  '/i/photos/film/01880012.jpg',
                  '/i/photos/film/01880013.jpg',
                  '/i/photos/film/01880037.jpg',
                  '/i/photos/film/03420024.jpg',
                  '/i/photos/film/04830011.jpg',
                  '/i/photos/film/04830022.jpg',
                  '/i/photos/film/04830028.jpg',
                  '/i/photos/film/10560004.jpg',
                  '/i/photos/film/10560013.jpg',
                  '/i/photos/film/10560024.jpg',
                  '/i/photos/film/96590007.jpg',
                  '/i/photos/film/01880019.jpg'],
  '100 days of design': ['/i/designs/100days/01-01.png',
                         //'/i/designs/100days/04-01.png',
                         '/i/designs/100days/05-01.png',
                         '/i/designs/100days/06-01.png',
                         '/i/designs/100days/08-01.png',
                         '/i/designs/100days/11-01.png',
                         '/i/designs/100days/15-01.png',
                         '/i/designs/100days/17-01.png',
                         '/i/designs/100days/18-01.png',
                         '/i/designs/100days/21-01.png',
                         '/i/designs/100days/22-01.png',
                         '/i/designs/100days/23-01.png',
                         '/i/designs/100days/24-01.png',
                         '/i/designs/100days/25-01.png',
                         '/i/designs/100days/26-01.png',
                         '/i/designs/100days/29-01.png',
                         '/i/designs/100days/32-01.png',
                         '/i/designs/100days/33-01.png']
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
  // sigh. just in case you mash the visual link
  clearInterval(intervalID);
  intervalID = setInterval(timeNext, 6000);
  $(document).keydown(keyHandler);
}
function deactivate() {
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
