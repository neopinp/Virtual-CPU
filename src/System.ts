// System.ts
import { Cpu } from "./Hardware/Cpu";
import { Memory } from "./Hardware/Memory";
import { Clock } from "./Hardware/Clock";
import { Hardware } from "./Hardware/Hardware";

export class System extends Hardware {
  //System components 
  private _CPU: Cpu;
  private memory: Memory;
  private clock: Clock;
  public running: boolean = false;   // indicate system running 

  constructor(debug: boolean = true) {
    super('System', debug);

  //initalize 
    this._CPU = new Cpu(debug);
    this.memory = new Memory(debug);
    this.clock = new Clock(debug);

  //register listeners 
    this.clock.registerListener(this._CPU);
    this.clock.registerListener(this.memory);


    this.log('created'); //log creation of System component 
  }

//starts system, intialize memory, display memory state, start system clock 
  public startSystem(): void {
    this.memory.initializeMemory(); 
    this.memory.displayMemory(0x00, 0x14); 
    this.log('System started'); 

    this.clock.startClock(1000);
    this.running = true;
  }

//stops system by halting system clock and logging stop 
  public stopSystem(): void {
    this.clock.stopClock();
    this.log('System stopped');
    this.running = false;
  }
}
