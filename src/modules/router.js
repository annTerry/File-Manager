import Navigator from './navigator.js';
import FileControl from './fileControl.js';
import OSFunctions from './osFunctions.js';
import Compress from './compression.js';
import ErrorCatcher from './ErrorCatcher.js';

export default class CommandRouter {
  constructor(navigator) {
    this.navigator = new Navigator();
    this.errorCatcher = new ErrorCatcher(this.navigator);
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
    try {
      const parsedString = this.parseStrings(string);
      switch (parsedString.command) {
        case 'up':
          this.navigator.upDir();
          break;
        case 'cd':
          if (parsedString.params && parsedString.params.length > 0) {
            await this.navigator.goToDir(parsedString.params[0]);
          }
          else {
            throw new Error('No path entered');
          }
          break;
        case 'ls':
          await this.navigator.showCurrentDirFileList();
          break;
          case 'hash':
            if (parsedString.params && parsedString.params.length > 0) {
              await FileControl.calculateHash(this.navigator.thisPath(parsedString.params[0]));
            }
            else {
              throw new Error('No file entered');
            }
            break;  
        case 'cat':
          if (parsedString.params && parsedString.params.length > 0) {
            await FileControl.readFile(this.navigator.thisPath(parsedString.params[0]));
          }
          else {
            throw new Error('No filename entered');
          }
          break;
        case 'rm':
          if (parsedString.params && parsedString.params.length > 0) {
            await FileControl.deleteFile(this.navigator.thisPath(parsedString.params[0]));
          }
          else {
            throw new Error('No filename entered');
          }
          break;
        case 'add':
          if (parsedString.params && parsedString.params.length > 0) {
            await FileControl.createFile(this.navigator.thisPath(parsedString.params[0]));
          }
          else {
            throw new Error('No file entered');
          }
          break;
        case 'cp':
          if (parsedString.params && parsedString.params.length > 1) {
            await FileControl.copyFile(this.navigator.thisPath(parsedString.params[0]), this.navigator.thisPath(parsedString.params[1]));
          }
          else {
            throw new Error('Wrong params numbers');
          }
          break;
        case 'rn':
          if (parsedString.params && parsedString.params.length > 1) {
            await FileControl.renameFile(this.navigator.thisPath(parsedString.params[0]), this.navigator.thisPath(parsedString.params[1]));
          }
          else {
            throw new Error('Wrong params numbers');
          }
          break;
        case 'mv':
          if (parsedString.params && parsedString.params.length > 1) {
            await FileControl.moveFile(this.navigator.thisPath(parsedString.params[0]), this.navigator.thisPath(parsedString.params[1]));
          }
          else {
            throw new Error('Wrong params numbers');
          }
          break;
        case 'compress':
          if (parsedString.params && parsedString.params.length > 1) {
            await Compress.compress(this.navigator.thisPath(parsedString.params[0]), this.navigator.thisPath(parsedString.params[1]));
          }
          else {
            throw new Error('Wrong params numbers');
          }
          break;
        case 'decompress':
          if (parsedString.params && parsedString.params.length > 1) {
            await Compress.decompress(this.navigator.thisPath(parsedString.params[0]), this.navigator.thisPath(parsedString.params[1]));
          }
          else {
            throw new Error('Wrong params numbers');
          }
          break;
        case 'os':
          if (parsedString.params && parsedString.params.length > 0) {
            console.log(OSFunctions.returnData(parsedString.params[0]));
            throw new Error('');
          }
          else {
            throw new Error('No params for os');
          }
          break;
        case '.exit':
          process.exit();
          break;
        default:
          throw new Error('Wrong command')
      }
    }
    catch (e) {
      this.errorCatcher.catchError(e);
    }
  }
}