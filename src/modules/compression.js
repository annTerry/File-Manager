
import fs from 'node:fs';
import zlib from 'node:zlib';
import { pipeline } from "node:stream/promises";

export default class Compress {
  static async compress(fileName, archiveName) {
    await this.action(zlib.createBrotliCompress(), fileName, archiveName, 'File successfully compressed!');
  };
  static async decompress(archiveName, fileName) {
    await this.action(zlib.createBrotliDecompress(), archiveName, fileName, 'File successfully decompressed!');
  };
  static async action(action, input, output, message) {
    try {
      await fs.promises.access(input, fs.promises.constants.R_OK);  
      await pipeline(
        fs.createReadStream(input),
        action,
        fs.createWriteStream(output)
      );
      throw new Error('');
    }
    catch (e) {
      if (e.message === '') {
        throw new Error(message);
      }
      throw new Error(e.message);
    }
  }  
}