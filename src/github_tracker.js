var recentCodeURL;

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

function highlight(code, url) {
  // TODO: only look at additions, maybe 5+ lines
  $('#recent_code').text(code);
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  recentCodeURL = url;
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

          $.get(commit.url, data => {
            if (mostRecent10LineDiff) { return; }
            var commitData = data;
            if (commitData.author.login !== 'phorust') {
              return;
            }
            for (var file of commitData.files) {
              if (file.additions < 10) {
                continue;
              }
              mostRecent10LineDiff = file.patch;
              return callback(file.patch, commitData.html_url);
            }
          });
        }
      }
    }
    return callback(null, null);
  };

  $.get(
    'https://api.github.com/users/phorust/events',
    data => {
      events = data;
      findMR10LD((mostRecent10LineDiff, url) => {
        if (!mostRecent10LineDiff) {
          mostRecent10LineDiff = "I haven't committed a 10 line block in a while.";
        } else {
          // TODO: complete me
          // var lines = mostRecent10LineDiff.split('\n');
          // var cleanedCode = "";
          // lines = lines.slice(1,lines.length);
          // for (var line of lines) {
          //   // remove +- gutter
          //   cleanedCode += line.slice(1, line.length);
          // }
        }
        highlight(mostRecent10LineDiff, url);
      });
    }
  );
});
