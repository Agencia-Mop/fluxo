import { DEBUG } from "./../config/constants";

export class Log {
  static log (msg: string) {
    if ( DEBUG ) {
      console.log(msg);
    }
  }
}