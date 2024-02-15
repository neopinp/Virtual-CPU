// hardware/System.ts
import { Cpu } from "./Cpu";
import { Hardware } from "./Hardware";

export class System extends Hardware {
  private _CPU: Cpu = null;
  public running: boolean = false;

  constructor() {
    super('System');
    this.debug = true;

    this._CPU = new Cpu();
    this.log('created');

    this.startSystem();
  }

  public startSystem(): boolean {
    this.log('System started');
    
    // Turn off debugging 
    this._CPU.debug = false;
    this._CPU.log('created');

    return true;
  }

  public stopSystem(): boolean {
    return false;
  }
}

let system: System = new System();
