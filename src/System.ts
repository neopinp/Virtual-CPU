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

    // Step 1: Initialize Memory
    this.memory = new Memory(debug);

    this.mmu = new MMU(this.memory); 

   
    this.cpu = new Cpu(null); 
    
    this.cpu.setMMU(this.mmu); 
    this.mmu.setCPU(this.cpu); 

    this.clock = new Clock(debug);
    this.clock.registerListener(this.cpu);
    this.clock.registerListener(this.memory);

    this.log('created');
  }

  public startSystem(): void {
    this.memory.reset();
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
    // This method should now ideally leverage MMU for memory access, reflecting the CPU-MMU-Memory interaction.
    this.log(`Dumping memory from address ${startAddress} to ${endAddress}`);
    this.mmu.memoryDump(startAddress, endAddress); // Assuming MMU class has been updated to include a memoryDump method.
  }
}
