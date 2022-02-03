import { ActionProps } from "./../types";
import { Action } from "./Action";
import { ActionFactory } from "./Factory/Action";

import { Log } from "./Log";

interface FluxProps {
  name?: string;
  flow: ActionProps[]
}

export class Flux {
  private actions: Action[] = [];
  private name: string = '';
  
  async init(content: FluxProps) {
    this.name = content.name || "";

    for (let i = 0; i < content.flow.length; i ++) {
      this.actions.push( await ActionFactory.new(content.flow[i]));      
    }
  }

  async start () {
    Log.log(`---> Start flux: ${this.name}`);

    let result: any;
    for(let i = 0; i < this.actions.length; i++) {
      result = await this.actions[i].exec(result);
    }
  }
}