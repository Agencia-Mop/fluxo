import glob from 'glob';
import { join } from 'path';
import { EventEmitter } from "events";

import { FluxFactory } from './Factory/Flux';
import { Flux } from './Flux';
import { Log } from './Log';

import { PATH_FLOWS } from './../config/constants';

export class App extends EventEmitter {
  private stream:Flux[] = [];

  constructor (options: any = {}) {
    super(options);
  }

  async init () {
    try {
      const matches = await (new Promise<any[]>((resolve, reject) => {
        glob(join(PATH_FLOWS, '**','*.json'), async (err, matches) => {
          if (err) {
            reject(err);
          }
          resolve(matches);
        });
      }))

      for(let i = 0; i < matches.length; i++) {
        this.stream.push( await FluxFactory.new(matches[i]));
      }
      this.emit('loaded');
    }
    catch (err) {
      console.log(err);
    }
  }

  async startFlow () {
    for(let i = 0; i < this.stream.length; i++) {
      await this.stream[i].start();
    }
  }
}