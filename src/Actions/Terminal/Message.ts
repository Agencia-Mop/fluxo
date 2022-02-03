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

class Message extends Action {
  public async exec(data: any): Promise<any> {
    super.exec(data);
    const message = this.getOptions().message;
    console.log(message);
    return data;
  }
}

export default Message;