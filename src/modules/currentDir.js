import os from 'node:os';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export default class CurrentDir {
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
}