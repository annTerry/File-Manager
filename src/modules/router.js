import Navigator from './navigator.js';
import FileControl from './fileControl.js';

export default class CommandRouter {
  constructor(navigator) {
    this.navigator = new Navigator();
  }
parseStrings(string) {
  const result = {};
  const clearString = string.trim();
  let separateIndex = clearString.indexOf(' ');
  separateIndex = separateIndex < 2 ? clearString.length : separateIndex;
  result.command = clearString.slice(0, separateIndex);
  if (clearString.length > result.command.length) {
    result.params = [];
    result.params[0] = clearString.slice(separateIndex).trim();
  }
  return result;
}  
go(string) {
  const parsedString = this.parseStrings(string);
  switch(parsedString.command){
    case 'up': 
      this.navigator.upDir();
      break;
    case 'cd':
      if (parsedString.params[0]) {
        this.navigator.goToDir(parsedString.params[0]);
      }
      break;
    case 'ls':
      this.navigator.showCurrentDirFileList();
      break;
    case 'cat':
      if (parsedString.params[0]) {
        FileControl.readFile(parsedString.params[0]);
      }
      break;
    case 'rm':
      if (parsedString.params[0]) {
        FileControl.deleteFile(parsedString.params[0]);
      }
       break;
    case 'add':
      if (parsedString.params[0]) {
        FileControl.createFile(parsedString.params[0]);
        }
       break;
    case 'cp':
      if (parsedString.params[0] && parsedString.params[1]) {
        FileControl.copyFile(parsedString.params[0], parsedString.params[1]);
        }
       break;
    case 'rn':
      if (parsedString.params[0] && parsedString.params[1]) {
        FileControl.renameFile(parsedString.params[0], parsedString.params[1]);
        }
       break;      
    case 'mv':
      if (parsedString.params[0] && parsedString.params[1]) {
        FileControl.moveFile(parsedString.params[0], parsedString.params[1]);
        }
       break;                 
    case '.exit':
      process.exit();
      break;
    default:
      console.log(parsedString.command);      
  }
}
}