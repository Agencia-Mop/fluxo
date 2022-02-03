import { Flux } from './../Flux';
import { readFile } from "fs/promises";

export class FluxFactory {

  static async new (fileName: string): Promise<Flux> {
    const file = await readFile(fileName);
    const content = JSON.parse(file.toString('utf-8'));

    const flux = new Flux();
    await flux.init(content);
    return flux;
  }

}