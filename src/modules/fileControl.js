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
    try {
      await fsPromises.access(fileName, fsPromises.constants.R_OK);
      const readStream = createReadStream(fileName);
      console.log('--- begin ---');
      for await (const chunk of readStream) {
        console.log(chunk.toString());
      }
    } catch (e) {      
      throw new Error('File not exist or not readable');
    }
    throw new Error('---end---');
  }
  static async deleteFile(fileName, noSilence = true) { //rm
    await fsPromises.unlink(fileName);
    if (noSilence) {throw new Error(fileName + " Deleted!")};
  }
  static async createFile(fileName) { //add
    const data = new Uint8Array(Buffer.from(''));
    await fsPromises.writeFile(fileName, data, (err) => {
      if (err) throw err;
    });
    throw new Error(`${fileName} created!`);
  }
  static async renameFile(oldFileName, newFileName) { 
    await fsPromises.rename(oldFileName, newFileName);
    throw new Error("Successfully renamed!");
  }
  static async copyFile(oldFileName, newFileName, noSilence = true) {
    try {
    await fsPromises.access(oldFileName, fsPromises.constants.R_OK);  
    await pipeline(
      createReadStream(oldFileName),
      createWriteStream(newFileName)
    );
    throw new Error('');
    }
    catch (e) {
      if (e.message === '' && noSilence) {
        throw new Error('Copy created!');
      }
      else if (e.message !== '') {
        throw new Error('File not exist or not readable');
      }
    }
  }
  static async moveFile(oldFileName, newFileName) { 
    await this.copyFile(oldFileName, newFileName, false);
    await this.deleteFile(oldFileName, false);
    throw new Error("File moved!");
  }
  static async calculateHash(fileName) 
  {
      const data = await fsPromises.readFile(fileName, "utf8");
      const hash = crypto.createHash('sha256').update(Buffer.from(data).toString()).digest('hex');
      throw new Error(hash);
  }
}