
import fs from 'node:fs';
import zlib from 'node:zlib';
import FileControl from './fileControl.js';

export default class Compress {
  static async compress(fileName, archiveName) {
    const gzip = zlib.createGzip();
    await this.action(gzip, fileName, archiveName, 'File successfully compressed!');
  };
  static async decompress(archiveName, fileName) {
    const unzip = zlib.createUnzip();
    await this.action(unzip, archiveName, fileName, 'File successfully decompressed!');
  };
  static async action(action, input, output, message) {
    const inputFIle = fs.createReadStream(input);
    const outputFile = fs.createWriteStream(output);
    await inputFIle.pipe(action).pipe(outputFile);
    throw new Error(message);
  }
}