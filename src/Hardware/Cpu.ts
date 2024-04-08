// Cpu.ts
import { Hardware } from "./Hardware";
import { ClockListener } from "./Imp/ClockListener";
import { MMU } from "./MMU";

export class Cpu extends Hardware implements ClockListener {
  private cpuclockCount = 0;
  private mmu: MMU | null;

  constructor(debug: boolean = true) {
    super('Cpu', debug);
    this.mmu = null; // initalizing MMU 
    this.log('created');
  }
// set MMU
  public setMMU(mmu: MMU): void {
    this.mmu = mmu;
  }

  pulse(): void {
    this.cpuclockCount++;
    this.log(`received clock pulse - CPU Clock Count: ${this.cpuclockCount}`);
  }
// read and write 
  readMemory(address: number): number {
    if (!this.mmu) {
      throw new Error("MMU is not set.");
    }
    return this.mmu.read(address);
  }

  writeMemory(address: number, data: number): void {
    if (!this.mmu) {
      throw new Error("MMU is not set.");
    }
    this.mmu.write(address, data);
  }
}
