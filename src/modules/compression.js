
import fs from 'node:fs';
import zlib from 'node:zlib';

export default class Compress {
  static async compress(fileName, archiveName) {
    await this.action(zlib.createBrotliCompress(), fileName, archiveName, 'File successfully compressed!');
  };
  static async decompress(archiveName, fileName) {
    await this.action(zlib.createBrotliDecompress(), archiveName, fileName, 'File successfully decompressed!');
  };
  static async action(action, input, output, message) {
    const inputFIle = fs.createReadStream(input);
    const outputFile = fs.createWriteStream(output);
    await inputFIle.pipe(action).pipe(outputFile);
    throw new Error(message);
  }
}