import os from 'node:os';

export default class OSFunctions {
  static returnData(param) {
    const indexParam = param.indexOf('--');
    if (indexParam!=0) throw new Error('Wrong command');
    else {
    const finalParam = param.replace('--', '');
    switch (finalParam) {
      case 'EOL': return JSON.stringify(os.EOL); 
      case 'cpus': {
        const osData = os.cpus();
        const osInfos = osData.map(data => data.model);
        return `There are ${osData.length} CPUs:
${osInfos.join(',' + os.EOL)}`;
      }
      case 'homedir': return os.homedir();
      case 'username': return os.userInfo().username;
      case 'architecture': return os.arch();
      default: throw new Error('Wrong command');
    }
  }
 }
}