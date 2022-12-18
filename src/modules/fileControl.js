import fsPromises from "node:fs/promises"
import { createReadStream, createWriteStream, lstat }  from 'node:fs';
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class FileControl {

  static async readFile(fileName) { //cat
    console.log('--- begin ---');

    try {
      await fsPromises.access(fileName, fsPromises.constants.R_OK);
      const readStream = createReadStream(fileName);
      for await (const chunk of readStream) {
        console.log(chunk.toString());
      }
    } catch (e) {
      throw new Error('File not exist or not readable');
    }
    throw new Error('---end---');
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
    throw new Error("Successfully renamed!");
  }
  static async copyFile(oldFileName, newFileName) {
    const readFile = createReadStream(oldFileName);
    const writeFile = createWriteStream(newFileName);
    readFile.on('error', (err) => {
      if (err.code === 'ENOENT') {
          throw new Error('No such file');
      }
      throw err;
  }).pipe(writeFile);
  readFile.on('close', () => {
    throw new Error('Copy created!');
   });
  }
  static async moveFile(oldFileName, newFileName) { 
    await this.copyFile(oldFileName, newFileName);
    await this.deleteFile(oldFileName);
    throw new Error("File moved!");
  }
  static async calculateHash(fileName) 
  {
      const data = await fsPromises.readFile(fileName, "utf8");
      const hash = crypto.createHash('sha256').update(Buffer.from(data).toString()).digest('hex');
      throw new Error(hash);
  }
}