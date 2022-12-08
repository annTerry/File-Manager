import UserData from './modules/userData.js';
import CommandManager from './modules/commandManager.js';

const userData = new UserData();
console.log(userData.welcome());
const commandManager = new CommandManager(userData);