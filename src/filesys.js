class FileSysObj {
  name: string;
  parentdir: string;
  path: string;

  constructor(name: string, parentdir: Directory) {
    this.path = parentdir + '/' + name;
  }
}

class File extends FileSysObj {
  constructor(name: string,
              parentdir: Directory,
              contents: string) {
    super(name, parentdir);
    this.contents = contents;
  }
}

class Directory extends FileSysObj {
  children: Object;

  constructor(name: string,
              parentdir: string,
              children?: Object) {
    super(name, parentdir);
    this.children = children || {}
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
    }
  }
}


window.fsroot = new Directory('', null);
window.fsroot.addChildren([new File('about', fsroot, '')]);
