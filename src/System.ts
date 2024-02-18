// System.ts
import { Cpu } from "./Hardware/Cpu";
import { Memory } from "./Hardware/Memory";
import { Clock } from "./Hardware/Clock";
import { Hardware } from "./Hardware/Hardware";

export class System extends Hardware {
  private _CPU: Cpu;
  private memory: Memory;
  private clock: Clock;
  public running: boolean = false;

  constructor(debug: boolean = true) {
    super('System', debug);

    this._CPU = new Cpu(debug);
    this.memory = new Memory(debug);
    this.clock = new Clock(debug);

    this.clock.registerListener(this._CPU);
    this.clock.registerListener(this.memory);

    this.log('created');
  }

  public startSystem(): void {
    this.memory.initializeMemory();
    this.memory.displayMemory(0x00, 0x14);
    this.log('System started');

    this.clock.startClock(1000);
    this.running = true;
  }

  public stopSystem(): void {
    this.clock.stopClock();
    this.log('System stopped');
    this.running = false;
  }
}
