import axios from "axios";
import fs from "fs";
import path from "path"
import { PATH_ROOT } from "../../config/constants";

import { Action } from "../../model/Action";

/**
 *  Exemplo de uso configuração
 * 
 {
  "name": "Download XLSX",
  "type": "action",
  "action": "File/Download",
  "actionOptions": {
    "conditions": [
      "localFileIsNotExists"
    ],
    "dest": "downloads",
    "newFileName": "planilha.xslx",
    "url": "http://s.anapro.com.br/a-p/tabelao_fixo/119_124_o8KtPJt8IMI1_SUPERCRMDB_tabelaoAtendimento.xlsx"
  }
}
*/

class FileDownload extends Action {

  public async exec(data: any): Promise<any> {
    super.exec(data);

    const options = this.getOptions();
    const localFileName = path.join(PATH_ROOT, options.dest, options.newFileName);

    try {
     
      const result = axios({
        url: options.url,
        method: 'get',
        responseType: 'stream'
      });

      const stream = (await result).data;

      await (new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(localFileName);
        writeStream.on('finish', () => resolve('finish'));
        stream.pipe(writeStream);
      }));

      return localFileName;
    }
    catch (err) {
      throw err;
    }
  }
}

export default FileDownload;