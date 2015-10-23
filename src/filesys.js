// TODO: how rad would it be if I stored the FS in localstorage
/**
 * Abstract base class - do NOT instantiate me!
 */
class FileSysObj {
  name: string;
  parentdir: string;

  constructor(name: string, parentdir: Directory) {
    this.name      = name;
    this.parentdir = parentdir;
  }

  getPath(): string {
    if (this === fshome) { return '~'; }
    return (this.parentdir ? this.parentdir.getPath(): '') + '/' + this.name;
  }

  getCSSClass(): string {
    return 'filesysobj';
  }
}

class File extends FileSysObj {
  constructor(name: string,
              parentdir: Directory,
              contents: string) {
    super(name, parentdir);
    this.contents = contents;
  }

  // Override
  getCSSClass() {
    return 'file';
  }
}

class Directory extends FileSysObj {
  children: Object;

  constructor(name: string,
              parentdir: Directory,
              children?: Object) {
    super(name, parentdir);
    this.children = children || {};
  }

  list(): Object {
    return this.children;
  }

  addChild(fsobj: FileSysObj) {
    this.children[fsobj.name] = fsobj;
  }

  addChildren(fsobjs: Array<FileSysObj>) {
    for (var child of fsobjs) {
      this.addChild(child);
      child.parentdir = this;
    }
  }

  // Override
  getCSSClass() {
    return 'directory';
  }
}

/**
 * The same as a File, but contents is valid javascript code that can be
 * eval()'d
 */
class Executable extends File {
  run(args: Array<any>): any {
    return babel.run(this.contents);
  }

  // Override
  getCSSClass() {
    return 'executable';
  }
}

/**
 * The same as a File, but contents is valid javascript code that can be
 * eval()'d
 */
class Link extends Executable {
  // Override
  getCSSClass() {
    return 'link';
  }
}

function getByPath(path: string): ?FileSysObj {
  // TODO: need support of thing/../thingspeer
  var tokens = path.split('/');
  var cwd = tokens[0] == '~' ? fshome : fsroot;
  tokens = tokens.slice(1, tokens.length);
  if (tokens[0] === '') {
    // '~/'.split('/') === ['~', '']
    return cwd;
  }

  for (var token of tokens) {
    var files = cwd.list();
    if (files[token]) {
      cwd = files[token]
    } else {
      return null;
    }
  }
  return cwd;
}

/**
 * Cleans a path
 *   //Users -> /Users
 */
function cleanPath(path: string): string {
  // hacky fix because too lazy to figure out the recursion
  path.slice(0,2) != '//' || (path = path.slice(1,path.length));
  return path;
}


var fsroot = new Directory('', null);
var fsroot_Users = new Directory('Users', fsroot);
var fsroot_Users_phorust = new Directory('phorust', fsroot_Users);
// hard code this for now; maybe i'll add envvars later
var fshome = fsroot_Users_phorust;

fsroot.addChildren([fsroot_Users]);
fsroot_Users.addChild(fsroot_Users_phorust);
fsroot_Users_phorust.addChildren(
  [
    new File('about', fsroot_Users_phorust, ''),
    new Directory('projects', fsroot_Users_phorust,
      { 'SummonerSync': new File('SummonerSync', null, 'e'),
        'phorust.github.io': new File('phorust.github.io', null, 'd'),
        'colorrange': new File('colorrange', null, 'c'),
        'SimpleSlide': new File('SimpleSlide', null, 'b'),
        'battery': new File('battery', null, 'a') }
    ),
    new File('help', fsroot_Users_phorust,
             'Welcome to phsh. Try all of your favorite shell commands!'),
  ]
);

module.exports('filesys', {
  FileSysObj,
  File,
  Directory,
  Link,
  Executable,
  getByPath,
  cleanPath,
  fsroot,
  fshome,
});
