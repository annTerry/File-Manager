
import fs from 'node:fs';
import zlib from 'node:zlib';

export default class Compress {
  static compress (fileName, archiveName) 
  {
    const gzip = zlib.createGzip(); 
    this.action(gzip, fileName, archiveName, 'File successfully compressed!');
  };
  static decompress (fileName, archiveName) 
  {
    const unzip = zlib.createUnzip();
    this.action(unzip, archiveName, fileName, 'File successfully decompressed!');
  };
  static action(action, input, output, message) {
    const inputFIle = fs.createReadStream(input); 
    const outputFile = fs.createWriteStream(output); 
    input.pipe(action).pipe(outputFile);
    console.log(message);
  }
}