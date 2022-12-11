import fs from "node:fs/promises"

export default class FileControl {

static readFile(fileName) { //cat
console.log ('read file ' + fileName);
}
static deleteFile(fileName) { //rm
  console.log ('delete file ' + fileName);
}
static createFile(fileName) { //add
  console.log ('create file ' + fileName);
}
static renameFile(oldFileName, newFileName) { //rn
  console.log ('rename file ' + oldFileName + " to" + newFileName);
}
static copyFile(oldFileName, newFileName) { //cp
  console.log ('copy file ' + oldFileName + " to" + newFileName);
}
static moveFile(oldFileName, newFileName) { //mv
  console.log ('move file ' + oldFileName + " to" + newFileName);
}

}