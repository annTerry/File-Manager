import Navigator from './navigator.js';

export default class CommandRouter {
  constructor(navigator) {
    this.navigator = new Navigator();
  }
parser(string) {
  const stringArray = string.split(' ');
  const command = stringArray[0].trim();
  switch(command){
    case 'up': 
      this.navigator.upDir();
      break;
    case 'cd':
      console.log('cd');
      break;
    case 'ls':
      this.navigator.showCurrentDirFileList();
      break;  
    case '.exit':
      process.exit();
      break;    
  }
}
}