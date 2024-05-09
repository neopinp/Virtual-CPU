// System.ts
import { Cpu } from "./Hardware/Cpu";
import { Memory } from "./Hardware/Memory";
import { Clock } from "./Hardware/Clock";
import { Hardware } from "./Hardware/Hardware";
import { MMU } from "./Hardware/MMU";

export class System extends Hardware {
  private cpu: Cpu;
  private memory: Memory;
  private clock: Clock;
  public mmu: MMU;
  public running: boolean = false;

  constructor(debug: boolean = true) {
    super('System', debug);

//initializations
    this.memory = new Memory(debug); // memory 

    this.mmu = new MMU(this.memory); // initalizes MMU with Memory instance

   
    this.cpu = new Cpu(null); // initalizes CPU without an MMU instance 
    
    this.cpu.setMMU(this.mmu);  // sets MMU instance in CPU
    this.mmu.setCPU(this.cpu); // sets CPU instance in MMU

    this.clock = new Clock(debug); //initalize clock 
    this.clock.registerListener(this.cpu); //register cpu as listener 
    this.clock.registerListener(this.memory); //register memeory as listener 

    this.log('created');
  }

  public startSystem(): void {
    this.log('System started');
    this.clock.startClock(1000); 
    this.running = true;
  }

  public stopSystem(): void {
    this.clock.stopClock();
    this.log('System stopped');
    this.running = false;
  }

  public dumpMemory(startAddress: number, endAddress: number): void {
    this.log(`Dumping memory from address ${startAddress} to ${endAddress}`);
    this.mmu.memoryDump(startAddress, endAddress); 
  }
}
