var commandsRun = [];
var commandIndex = -1; // counts backwards
var cwd;
var lastwd;

/* Shell internal functions */
function print(s: string, noNewline?: boolean, noPrompt?: boolean) {
  noPrompt || printOldPrompt();
  noNewline || $('#textarea').append(s + '<br>');
}

function printf(tokens: Array<Object>, columns?: number) {
  var maxTokenLen = 0;
  var columnWidth;
  var columnsPerRow;
  for (var token of tokens) {
    maxTokenLen = Math.max(maxTokenLen, token.text.length);
  }
  columnWidth = maxTokenLen + 1;
  columnsPerRow = Math.max(1, Math.trunc(window.WIDTH / columnWidth));

  // null columns is auto
  columns || (columns = columnsPerRow);

  var toPrint = '';
  printOldPrompt();

  for (var i = 0; i < tokens.length; i++) {
    var withPadding = tokens[i].markup;
    for (var j = tokens[i].text.length; j < columnWidth; j++) {
      withPadding += ' ';
    }

    if (i > 0 && i % columns == 0) {
      toPrint += '<br>';
    }
    toPrint += withPadding;
  }
  $('#textarea').append(toPrint + '<br>');
}

function cycleCommand(n) {
  var toDisplay;
  commandIndex -= n;
  commandIndex = Math.min(commandIndex, commandsRun.length - 1);
  commandIndex = Math.max(0, commandIndex);
  toDisplay = commandsRun.length - 1 - commandIndex;
  $('#lastline > input').val(commandsRun[toDisplay]);
}

function updatePrompt(path?: string) {
  path || (path = cwd.getPath());
  $('.prompt_path').last().text(path);

  // If the terminal is hidden, width() is 0
  var promptPathStringWidth = $('.prompt_path').last().width() || 8;
  var promptCharacterWidth  = ($('.prompt_arrow').width() || 8) * 3;
  $('#lastline > input').width(
    $('#output').width() - promptPathStringWidth - promptCharacterWidth
  );
}

function printOldPrompt() {
  $('#textarea').append(
    window.PROMPT + $('#lastline > input').val() + '<br>'
  );
  $('#textarea .prompt_path').last().text(
    $('.prompt_path').last().text()
  );
}

function processInput() {
  var input = $('#lastline > input').val();
  var tokens = input.split(' '); // other whitespace?

  if (input !== '') {
    switch (tokens[0]) {
      case 'cat':
        cat(tokens);
        break;
      case 'cd':
        cd(tokens);
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
      case 'logout':
        exit(tokens);
        break;
      case 'ls':
        ls(tokens);
        break;
      case 'pwd':
        pwd(tokens);
        break;
      case 'touch':
        touch(tokens);
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
    updatePrompt();
  } else {
    print('', true);
  }
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

function suggestCommand() {
  // TODO
}


/* Commands. TODO: move to new file */
function cat(argv) {
  print('', true);
  if (argv.length <= 1) {
    // real cat enters an interactive mode but...
    return;
  }
  var files = cwd.list();
  for (var i = 1; i < argv.length; i++) {
    if (files[argv[i]]) {
      if (files[argv[i]] instanceof window.File) {
        print(files[argv[i]].contents, false, true);
      } else {
        print(`cat: ${argv[i]}: Is a directory`, false, true);
      }
    } else {
      print(`cat: ${argv[i]}: No such file or directory`, false, true);
    }
  }
}

function cd(argv) {
  // TODO: take advantage of window.getByPath
  var files = cwd.list();
  // Special path codes
  if (argv[1] === '-') {
    [lastwd, cwd] = [cwd, lastwd];
    print(cwd.getPath());
    return;
  } else if (argv[1] === '..') {
    lastwd = cwd;
    cwd = cwd.parentdir || cwd;
    return print('', true);
  } else if (argv[1] === '.') {
    return print('', true);
  }

  // Absolute paths
  // if (argv[1][1] == '/'

  // in local dir
  if (files[argv[1]]) {
    if (files[argv[1]] instanceof window.Directory) {
      lastwd = cwd;
      cwd = files[argv[1]];
      print('', true);
    } else {
      print(`cd: not a directory: ${argv[1]}`);
    }
  } else {
    print(`cd: no such file or directory: ${argv[1]}`);
  }
}

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
  var toPrint = [];
  if (argv[1] == '-l') {

  }

  for (var filename of Object.keys(files).sort()) {
    var markup = `<span class='${files[filename].getCSSClass()}'>${filename}</span>`;
    toPrint.push({ text: filename,
                   markup });
  }
  printf(toPrint, null);
}

function pwd(tokens) {
  print(cwd.getPath());
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
  lastwd = window.fsroot;

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
        $('#output').scrollTop($('#textarea').height());
        commandIndex = -1;
        break;
      default:
        return;
    }
  });
  $('#lastline').on('keydown', e => {
    // grab before input focus leaves
    switch (e.keyCode) {
      case 9:
        e.preventDefault();
        suggestCommand();
        break;
      default:
        return;
    }
  });
});
