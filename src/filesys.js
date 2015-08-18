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
  children: Array<FileSysObj>;

  constructor(name: string,
              parentdir: string,
              children?: Array<FileSysObj>) {
    super(name, parentdir);
    this.children = children || [];
  }

  list(): Array<FileSysObj> {
    return this.children;
  }

  addChild(fsobj: FileSysObj) {
    this.children.append(fsobj);
  }

  addChildren(fsobjs: Array<FileSysObj>) {
    this.children = this.children.concat(fsobjs);
  }
}


window.fsroot = new Directory('', null);
window.fsroot.addChildren([new File('about', fsroot, '')]);
