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
  private mmu: MMU;
  public running: boolean = false;

  constructor(debug: boolean = true) {
    super('System', debug);

    this.memory = new Memory(debug);
    // MMU is instantiated without a CPU reference initially
    this.mmu = new MMU(this.memory, null); // Adjust your MMU constructor accordingly
    this.cpu = new Cpu(null, debug); // CPU is instantiated without the MMU initially
    this.cpu.setMMU(this.mmu); // MMU is then set in the CPU
    this.mmu.setCPU(this.cpu); // Now, properly set the CPU in the MMU, ensure MMU class has a setCPU method.

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
    this.log(`Dumping memory from address ${startAddress} to ${endAddress}`);
    // Assuming memory display through MMU for consistent access control
    // Adjust if your MMU class has a direct method for memory dumping
    this.mmu.memoryDump(startAddress, endAddress); 
  }
}
