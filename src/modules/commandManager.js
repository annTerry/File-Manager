import process from 'node:process';
import CurrentDir from './currentDir.js';

export default class CommandManager {
  constructor (userData) {
    this.currentDir = new CurrentDir();
    process.stdin.on("data", data => {
      console.log(data.toString());
      this.currentDir.upDir();
    });
    process.stdin.on("close", () => {
      console.log(userData.goodBuy());
    });
  }
}