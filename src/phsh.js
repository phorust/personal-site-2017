var commandsRun = [];
var commandIndex = -1; // counts backwards
var cwd;

/* Shell internal functions */
function print(s) {
  $('#textarea').append(
    window.PROMPT + $('#lastline > input').val() + '<br>'
  );
  if (typeof s === 'string') {
    _printString(s)
  }
}

function _printString(s) {
  $('#textarea').append(s + '<br>');
}

function cycleCommand(n) {
  var toDisplay;
  commandIndex -= n;
  commandIndex = Math.min(commandIndex, commandsRun.length - 1);
  commandIndex = Math.max(0, commandIndex);
  toDisplay = commandsRun.length - 1 - commandIndex;
  $('#lastline > input').val(commandsRun[toDisplay]);
}

function processInput() {
  var input = $('#lastline > input').val();
  var tokens = input.split(' '); // other whitespace?

  switch (tokens[0]) {
    case 'cat':
      print('test');
      break;
    case 'clear':
      clear(tokens);
      break;
    case 'echo':
      echo(tokens);
      break;
    case 'exit':
      exit(tokens);
      break;
    case 'll':
      tokens.splice(1, 0, '-A');
      // purposeful lack of break;
    case 'ls':
      ls(tokens);
      break;
    case 'pwd':
      print('test3');
      break;
    case 'uptime':
      uptime(tokens);
      break;
    case 'w':
    case 'who': // not really the same
      print('who');
      break;
    case 'whoami':
      print('whoami');
      break;
    case 'where':
      print('test4');
      break;
    case 'which':
      print('test5');
      break;
    default:
      print('phsh: command not found: ' + tokens[0]);
  }

  commandsRun.push(input);
  $('#lastline > input').val('');
}

function processFlags(tokens, flags) {
  // O(nm) where n is num flags and m is sum lengths of tokens
  var found = new Set();
  for (var token of tokens) {
    if (token[0] === '-') {
      // --long-form-options
      if (token[1] === '-') {
        if (flags.indexOf(token) !== -1) {
          found.add(token);
        }
      }
      // -lAGh, short form options which can be concat together
      for (var flag of flags) {
        if (found.has(flag)) { continue; }
        if (token.indexOf(flag) !== -1) {
          found.add(flag);
        }
      }
    }
  }

  return Array.from(found);
}


/* Commands. TODO: move to new file */
function clear(argv) {
  $('#textarea').html('');
}

function echo(argv) {
  if (argv[1]) {
    if (argv[1][0] == '$') {
      switch (argv[1]) {
        case '$HOME':
          print('/home/phorust');
          break;
        case '$TERM':
          print('phorust-term');
          break;
        case '$USER':
          print('phorust');
          break;
        case '$EDITOR':
          print('vim');
          break;
        case '$SHELL':
          print('/bin/phsh');
          break;
        case '$PATH':
          print('/home/phorust/bin:/usr/bin:/usr/sbin');
          break;
      }
    } else {
      // handle "" later
      var toPrint = '';
      for(var i = 1; i < argv.length; i++) {
        toPrint += argv[i] + ' ';
      }
      print(toPrint);
    }
  }
}

function exit(argv) {
  window.minimize();
  clear();
}

function ls(argv) {
  var files = cwd.list();
  if (argv[1] == '-l') {

  }
  console.log(files);
  print(Object.keys(files));
}

function uptime(argv) {
  var secs = (Date.now() - startTime) / 1000;
  var mins = Math.round(secs / 60);
  var secs = Math.round(secs % 60);
  if (mins < 10) {
    mins = '0' + mins;
  }
  if (secs < 10) {
    secs = '0' + secs;
  }
  print(mins + ':' + secs);
}


$(document).ready(_ => {
  cwd = window.fsroot;

  $('#lastline').on('keyup', e => {
    e.preventDefault();
    switch (e.keyCode) {
      case 38: // up
        cycleCommand(-1);
        break;
      case 40: // down
        cycleCommand(1);
        break;
      case 13: // enter
        processInput();
        $('#output').scrollTop($('#output').height());
        commandIndex = -1;
        break;
      default:
        return;
    }
  });
});
