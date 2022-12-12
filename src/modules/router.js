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
  const paramsData = clearString.slice(separateIndex).trim();
  if (clearString.length > result.command.length) {
    result.params = [];
    if (paramsData.includes('"')) {
      const sepByQuotes = paramsData.split('"');
      const allParams = sepByQuotes.filter(data => data.trim().length > 0);
      if (allParams.length > 1) {
        result.params[0] = allParams[0].trim();
        result.params[1] = allParams[1].trim();
      }
      else {
        result.params[0] = allParams[0];
      }
    }
    else if (paramsData.includes(' ')) {
      const sepBySpace = paramsData.split(' ');
      const allParams = sepBySpace.filter(data => data.trim().length > 0);
      if (allParams.length > 1) {
        result.params[0] = allParams[0].trim();
        result.params[1] = allParams[1].trim();
      }
      else {
        result.params[0] = allParams[0];
      }
    }
    else {
    result.params[0] = paramsData;
  }
  }
  return result;
}  
async go(string) {
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
        await FileControl.readFile(this.navigator.thisPath(parsedString.params[0]));
      }
      break;
    case 'rm':
      if (parsedString.params[0]) {
        await FileControl.deleteFile(this.navigator.thisPath(parsedString.params[0]));
      }
       break;
    case 'add':
      if (parsedString.params[0]) {
        await FileControl.createFile(this.navigator.thisPath(parsedString.params[0]));
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