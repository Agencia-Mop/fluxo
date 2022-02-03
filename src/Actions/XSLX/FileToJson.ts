import xlsx from "xlsx";
import { join } from 'path';
import fs from 'fs';
import { PATH_DOWNLOADS } from './../../config/constants';

import { Action } from "../../model/Action";


class FileToJson extends Action {

  public async exec(stringFileName: string): Promise<any> {
    super.exec(stringFileName);
     
    const jsonFile = this.getOptions().jsonFileName;
    const localFileJson = join(PATH_DOWNLOADS, jsonFile);

    const workbook = xlsx.readFile(stringFileName, {
      bookDeps: false,
      WTF: false,
      bookFiles: false,
      bookProps: false,
      bookSheets: false,
      bookVBA: false,
      cellDates: false,
      cellFormula: false,
      cellHTML: false,
      cellNF: false,
      cellStyles: false,
      dense: false,
      raw: true,
      type: 'buffer'
    });

    const first_sheet_name = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[first_sheet_name];
    
    await (new Promise ((resolve, reject) => {
      const stream = xlsx.stream.to_csv(worksheet, {
        rawNumbers: true
      });

      // const streamJson = fs.createWriteStream(join(PATH_DOWNLOADS, 'planilha.csv'));
      // streamJson.on('finish', () => {
      //   resolve('finish');
      // });
      // streamJson.on('error', (err: Error) => {
      //   reject(err);
      // });
      // streamJson.pipe(stream);
    }));
    

    return localFileJson;
  }

}

export default FileToJson;