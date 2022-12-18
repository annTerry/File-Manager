import process from 'node:process';


const USERNAME_KEY = '--username='; 

export default class UserData {
userName = '';  
constructor () {
  const userArgs = process.argv.filter(data => data.indexOf(USERNAME_KEY) >= 0);
  if (userArgs.length > 0) {
    this.userName = userArgs[0].slice(USERNAME_KEY.length);
    this.userName = this.userName.charAt(0).toUpperCase() + this.userName.slice(1);
  }
}
getUserName() {
  return this.userName;
}
welcome()
{
  return `Welcome to the File Manager, ${this.userName}!`;
}
goodBuy()
{
  return `Thank you for using File Manager, ${this.userName}, goodbye!`;
}
}