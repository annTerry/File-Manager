import fsPromises from "node:fs/promises"
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class FileControl {

  static async readFile(fileName) { //cat
    console.log('--- begin ---');
    const stream = fs.ReadStream(fileName, { encoding: 'utf-8' });
    await stream.on('readable', async () => {
      var data = await stream.read();
      if (data != null) console.log(data);
    });
    stream.on('close', () => {
      console.log('--- end ---');
    });
  }
  static async deleteFile(fileName) { //rm
    await fsPromises.unlink(fileName);
    console.log(fileName + " Deleted!");
  }
  static async createFile(fileName) { //add
    const data = new Uint8Array(Buffer.from(''));
    await fsPromises.writeFile(fileName, data, (err) => {
      if (err) throw err;
    });
    console.log(`${fileName} created!`);
  }
  static async renameFile(oldFileName, newFileName) { 
    await fsPromises.rename(oldFileName, newFileName);
    console.log("Successfully renamed!");
  }
  static async copyFile(oldFileName, newFileName) {
    await fsPromises.copyFile(oldFileName, newFileName);
    console.log("Copy created");
  }
  static async moveFile(oldFileName, newFileName) { 
    await fsPromises.moveFile(oldFileName, newFileName);
    console.log("File moved");
  }
  
  
}