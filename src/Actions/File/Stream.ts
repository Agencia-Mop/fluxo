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
    "filename": ""
  }
}
*/

class Stream extends Action {

  public async exec(data: any): Promise<any> {
    super.exec(data);
    const options = this.getOptions();

    try {
      
    }
    catch (err) {
      throw err;
    }
  }
}

export default Stream;