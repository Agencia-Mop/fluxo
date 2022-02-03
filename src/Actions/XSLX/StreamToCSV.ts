import { Action } from "../../model/Action";
import xlsx from "xlsx";
import Stream from "../File/Stream";

/**
 * ,
    {
      "name": "Convert XLSX to JSON",
      "type": "action",
      "action": "XSLX/FileToJson",
      "actionOptions": {
        "jsonFileName": "planilha.json"
      }
    }

 */

class StreamToCSV extends Action {

  public exec(stream: Stream): Promise<any> {
    const worksheet = xlsx.read(stream);

    const result = xlsx.stream.to_json(worksheet);

    return result;
  }

}


export default StreamToCSV;