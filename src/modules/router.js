import Navigator from './navigator.js';

export default class CommandRouter {
  constructor(navigator) {
    this.navigator = new Navigator();
  }
parser(string) {
  const clearString = string.trim();
  let separateIndex = clearString.indexOf(' ');
  separateIndex = separateIndex < 2 ? clearString.length : separateIndex;
  const command = clearString.slice(0, separateIndex);
  switch(command){
    case 'up': 
      this.navigator.upDir();
      break;
    case 'cd':
      if (clearString.length > command.length) {
        let thisDir = clearString.slice(separateIndex).trim();
        this.navigator.goToDir(thisDir);
      }
      break;
    case 'ls':
      this.navigator.showCurrentDirFileList();
      break;  
    case '.exit':
      process.exit();
      break;
    default:
      console.log(command);      
  }
}
}