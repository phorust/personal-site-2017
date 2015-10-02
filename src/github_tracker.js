var showAbout = modules.kml_new.showAbout;

// The access token here has absolutely no power to do anything, they're
// just used to bypass rate limits
var recentCodeURL;
var access_token = '63540329ea0788edef4210cb78b40f77461de963';

// thanks to http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function highlight(code, url, lang) {
  $('#recent_code').text(code);
  // overwrite last language class (shouldn't ever happen);
  $('#recent_code').attr('class', 'hljs ' + lang);
  $('pre code').each((i, block) => {
    hljs.highlightBlock(block);
  });
  recentCodeURL = url;

  // now we highlight what hljs missed
  // in the future: maybe don't highlight whitespace?
  // TODO: support nested plaintext (fails for CSS)
  var unhighlighted = $('#recent_code')
                        .contents()
                        .filter(function() { return this.nodeType == 3; });
  for (var i = 0; i < unhighlighted.length; i++) {
    var text = unhighlighted[i];
    $(text).replaceWith("<span class='hljs-kl-plaintext'>" +
                           text.data +
                         '</span>');
  }
  // let's get rid of gaps
  var highlighted = $('#recent_code')
                      .contents();
  for (var i = 0; i < highlighted.length; i++) {
    var block = highlighted[i];
    if ($(block).text().length == 1) {
      // merge this color with the last
      $(block).attr('class', $(block).prev().attr('class'));
    }
  }

  // maybe not the best but
  showAbout();
}

function getInterestingBlockFromPatch(patch) {

}

$(document).ready(_ => {
  var mostRecent10LineDiff;
  var events;
  var findMR10LD = callback => {
    // Cycle events, find pushes
    // Cycle pushes, find commits
    // Cycle commits, find files changed
    // Cycle files changed, find 10 line changes
    for (var event of events) {
      // TODO: event.type === 'PullRequestEvent'
      if (event.type === 'PushEvent') {
        // okay so not most recent, just a 10 block diff from a file changed in
        // the most recent commit
        shuffle(event.payload.commits);

        for (var commit of event.payload.commits) {
          if (mostRecent10LineDiff) { return; }

          $.get(
            commit.url,
            { access_token },
            data => {
              if (mostRecent10LineDiff) { return; }
              var commitData = data;
              if (commitData.author.login !== 'phorust') {
                return;
              }
              for (var file of commitData.files) {
                if (file.additions < 10) { continue; }
                var lang = file.filename.split('.');
                lang = lang[lang.length - 1];
                mostRecent10LineDiff = file.patch;
                return callback(file.patch, commitData.html_url, lang);
              }
            }
          );
        }
      }
    }
    return callback(null, null, null);
  };

  $.get(
    'https://api.github.com/users/phorust/events',
    { access_token },
    data => {
      events = data;
      findMR10LD((mostRecent10LineDiff, url, lang) => {
        if (!mostRecent10LineDiff) {
          mostRecent10LineDiff =
            "I haven't committed a 10 line block in a while.";
        } else {
          // TODO: effectively mark deletions + additions, or only show additions
          var lines = mostRecent10LineDiff.split('\n');
          var cleanedCode = "";
          // remove diff header @@ +25, -18 @@ thing
          for (var line of lines) {
            // skip deletions
            if (line[0] === '-') { continue; }
            // remove + gutter or @@ if found
            if (line.indexOf(' @@') > 0) {
              line = '...';
            } else {
              line = line.slice(1, line.length);
            }
            cleanedCode += line + '\n';
          }
          highlight(cleanedCode, url, lang);
        }
      });
    }
  );
});
