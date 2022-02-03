// import zip, { deflate, unzip } from 'zlib';
import { Action } from "../../model/Action";
import { Parse } from 'unzipper';
import { join } from 'path';
import { createWriteStream, createReadStream, Dir } from 'fs';
import { mkdir } from "fs/promises";
import { PATH_DOWNLOADS } from "../../config/constants";
import { opendir } from "fs/promises";

const createDir = async (path: string): Promise<void> => {
  try {
    const result = await mkdir(path);
    return result;
  } catch (e) {
    throw e;
  }
}

const unzipFile = async (filename: string, out: string) => {

  const stream = createReadStream(filename).pipe(Parse({
    verbose: false,
    forceStream: true
  }));
  const unzipPath = join(PATH_DOWNLOADS, out);

  try {
    await createDir (unzipPath);
  } catch (e) {
    
  }

  return new Promise( async (resolve, reject) => {

    stream.on('entry', (entry) => {
      if (entry.type) {
        //const writeStream = createWriteStream(join(unzipPath, entry.path));
//        return entry.pipe(writeStream);
      } else if (entry.type === 'Dir') {
        createDir(join(unzipPath, entry.path));
      }
    });
    stream.on('finish', () => resolve('finished'));
    // stream.on('error', (error) => reject(error));
  });
};

class Unzip extends Action {
  public async exec(zipFile: string): Promise<any> {
    const out = this.getOptions().out;

    try {
      await unzipFile(zipFile, out);
  
    } catch (err) {
      console.log(err);
    }

    return "";
  }

}

export default Unzip;