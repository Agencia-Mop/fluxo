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
  "action": "File/Stream",
  "actionOptions": {
    "url": "http://s.anapro.com.br/a-p/tabelao_fixo/119_124_o8KtPJt8IMI1_SUPERCRMDB_tabelaoAtendimento.xlsx"
  }
}
*/

class Stream extends Action {

  public async exec(data: any): Promise<any> {
    super.exec(data);
    const options = this.getOptions();

    try {
      const result = axios({
        url: options.url,
        method: 'get',
        responseType: 'stream'
      });

      const stream = (await result).data;
      return stream;
    }
    catch (err) {
      throw err;
    }
  }
}

export default Stream;