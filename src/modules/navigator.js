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
  setCurrent(newPath) {
    this.current = path.join(this.current, newPath);
  }
  upDir() {
   const dirArray = this.current.split(this.sep); 
   dirArray.pop();
   this.current = dirArray.length > 1 ? dirArray.join(this.sep) : this.current;
   console.log(this.showCurrent());
  }
  showCurrent() {
    return `You are currently in ${this.current}`;
  }
  async showCurrentDirFileList() {
    const fileList = await this.fileList(this.current);
    console.table(fileList);
  }
  async fileList(dir) {
    const filesInDir = await fs.readdir(dir);
    const files = await Promise.all(
      filesInDir.map(async (file) => {
            const filePath = path.join(dir, file);
            const stats = await fs.stat(filePath);         
            if (stats.isDirectory()) {
              return {Name:file,type:'directory'};
            } else {
                return {Name:file,type:'file'};
            }
        })
    );
    return files;
  }
}