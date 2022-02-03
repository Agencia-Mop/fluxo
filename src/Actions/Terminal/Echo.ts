import { Action } from "../../model/Action";

/**
{
  "name": "Action Bye",
  "type": "action",
  "action": "Terminal/Message",
  "actionOptions": {
    "message": "Bye World"
  }
}
*/

class Echo extends Action {
  public async exec(data: any): Promise<any> {
    super.exec(data);
    console.log(data);
    return data;
  }
}

export default Echo;