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

  getPath() {
    return (this.parentdir ? this.parentdir.getPath() : '/') + this.name;
  }

  getCSSClass() {
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
  constructor(name: string,
              parentdir: Directory,
              contents: string) {
    super(name, parentdir);
    this.contents = contents;
  }

  run(args: Array<any>): any {
    return babel.run(this.contents);
  }

  // Override
  getCSSClass() {
    return 'executable';
  }
}

function getByPath(path: string): FileSysObj {
  // TODO
}


var helptext = 'Welcome to phsh. Try all of your favorite shell commands!';
window.File = File;
window.Directory = Directory;
window.Executable = Executable;
window.getByPath = getByPath;
window.fsroot = new Directory('', null);
window.fsroot.addChildren(
  [
    new File('about', fsroot, ''),
    new Directory('projects', fsroot,
      { 'SummonerSync': new File('SummonerSync', null, 'e'),
        'phorust.github.io': new File('phorust.github.io', null, 'd'),
        'colorrange': new File('colorrange', null, 'c'),
        'SimpleSlide': new File('SimpleSlide', null, 'b'),
        'battery': new File('battery', null, 'a') }
    ),
    new File('help', fsroot, helptext),
  ]
);
