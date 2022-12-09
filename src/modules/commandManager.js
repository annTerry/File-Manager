import process from 'node:process';
import Router from './router.js';

export default class CommandManager {
  constructor (userData) {
    this.router = new Router();
    process.stdin.on("data", data => {
      this.router.parser(data.toString());
    });
    process.on("exit", () => {
      console.log("\n" + userData.goodBuy());
    });
    process.on('SIGINT', () => {
      process.exit();
    });
  }
}