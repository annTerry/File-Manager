import os from 'node:os';

export default class OSFunctions {
  static returnData(param) {
    const finalParam = param.replace('--', '');
    switch (finalParam) {
      case 'EOL': return os.EOL;
      case 'cpus': return os.cpus();
      case 'homedir': return os.homedir();
      case 'username': return os.username;
      case 'architecture': return os.architecture;
        return ''
    }
  }
}