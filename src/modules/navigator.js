import os from 'node:os';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export default class Navigator {
  
  filename = fileURLToPath(import.meta.url);
  
  dirname = path.dirname(this.filename);
  
  current = os.homedir();
  
  sep = path.sep;
  
  constructor() {
    console.log(this.showCurrent());
  }

  getCurrent() {
    return this.current;
  }

  upDir() {
   const dirArray = this.current.split(this.sep); 
   dirArray.pop();
   this.current = dirArray.length > 1 ? dirArray.join(this.sep) : dirArray.length > 0 ? dirArray + this.sep : this.current;
   throw Error('');
  }

  showCurrent() {
    return `You are currently in ${this.current}
Please enter command`;
  }

  thisPath(paramName) {
    return path.resolve(this.current, paramName);
  }

  async goToDir(dir) {
    try {
    if (await (await fs.lstat(this.thisPath(dir))).isDirectory()) {
    this.current = this.thisPath(dir);
    throw new Error('');
  }
  else {
    throw new Error(`It's not directory!`);
  }
    }
    catch (e) {
      if (e.message) {
        throw new Error(e.message);
      }
      else {
        throw new Error('');
      }
    }
  }

  async showCurrentDirFileList() {
    const fileList = await this.fileList(this.current);
    const sortedFileList = fileList.sort((a,b) => {
      if (a.Type > b.Type) return 1;
      else if (a.Type < b.Type) return -1;
      else if (a.Name.toUpperCase() > b.Name.toUpperCase()) return 1;
      else return -1;
    })
    console.table(sortedFileList);
    throw Error('');
  }

  async fileList(dir) {
    const filesInDir = await fs.readdir(dir);
    const files = await Promise.all(
      filesInDir.map(async (file) => {
            const filePath = path.join(dir, file);
            const stats = await fs.stat(filePath);         
            if (stats.isDirectory()) {
              return {Name:file,Type:'directory'};
            } else {
                return {Name:file,Type:'file'};
            }
        })
    );
    return files;
  }
}