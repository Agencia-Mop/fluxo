import { ActionProps } from "./../types";
import { Log } from "./Log";

export class Action {
  private _type: string;
  private _action: string;
  private _actionOptions: {[key: string]: any};
  private _name: string = "";

  constructor (data: ActionProps) {
    this._name = data.name || "";
    this._type = data.type;
    this._action = data.action;
    this._actionOptions = data.actionOptions;
  }

  public getOptions () {
    return this._actionOptions;
  }

  public getAction () {
    return this._action;
  }

  public getType () {
    return this._type;
  }

  public async exec(data: any): Promise<any> {
    Log.log(`  --> Action ${this._name}`);
    return data;
  }
}