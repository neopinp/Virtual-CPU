import { Hardware } from "./Hardware";
import { ClockListener } from "./Imp/ClockListener";
import { MMU } from "./MMU"; 

export class Cpu extends Hardware implements ClockListener {
  private cpuclockCount = 0; 
  private mmu: MMU; 

  constructor(mmu: MMU, debug: boolean = true) {
    super('Cpu', debug); 
    this.mmu = mmu; 
    this.log('created');
  }

  pulse(): void {
    this.cpuclockCount++;
    this.log(`received clock pulse - CPU Clock Count: ${this.cpuclockCount}`);
  }

  readMemory(address: number): number {
    return this.mmu.read(address);
  }

  writeMemory(address: number, data: number): void {
    this.mmu.write(address, data);
  }

}
