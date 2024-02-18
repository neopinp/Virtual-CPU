//Cpu.ts
import { Hardware } from "./Hardware";
// import class 

export class Cpu extends Hardware {
  constructor(debug: boolean = true) {
    super('Cpu', debug);
    this.log('created');
  }
}
