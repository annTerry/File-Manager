import process from 'node:process';


const USERNAME_KEY = '--username='; 

export default class UserData {
userName = '';  
constructor () {
  const userArgs = process.argv.filter(data => data.indexOf(USERNAME_KEY) >= 0);
  console.log (process.argv);
  if (userArgs.length > 0) {
    this.userName = userArgs[0].slice(USERNAME_KEY.length);
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