import { Stream } from 'stream';

import { Action } from "../../model/Action";

class Read extends Action {

  public async exec(stream: Stream): Promise<any> {
    
    try {
      const result = await (new Promise ((resolve, reject) => {
        setTimeout(() => {
          resolve('Ola mundo');
        }, 2000);
      }));

      console.log(result);

    } catch (err) {
      console.log(err);
    }

  }

}

export default Read;