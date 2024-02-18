//System.ts
import { Cpu } from "./Hardware/Cpu";
import { Hardware } from "./Hardware/Hardware";
import { Memory } from "./Hardware/Memory"; 


export class System extends Hardware {
  private _CPU: Cpu;
  private memory: Memory; 
  public running: boolean = false;

  constructor() {
    super('System');
    this.debug = true;

    // Instantiate Memory and CPU
    this.memory = new Memory(); 
    this._CPU = new Cpu();

    this.log('created');

    this.startSystem();
  }

  public startSystem(): boolean {
    this.memory.initializeMemory(); //initialize memory 
    this.memory.displayMemory(0x00, 0x14);
    this.log('System started');


    this._CPU.debug = true;
    this._CPU.log('created');

    this.running = true;
    return this.running;
  }

  public stopSystem(): boolean {
    this.running = false;
    return this.running;
  }
}

// Instantiate the System to start initilization 
let system: System = new System();
