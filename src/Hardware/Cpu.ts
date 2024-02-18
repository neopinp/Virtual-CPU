// Cpu.ts
import { Hardware } from "./Hardware";
import { ClockListener } from "./Imp/ClockListener";


export class Cpu extends Hardware implements ClockListener {
  private clockCount = 0; // Add a counter for the clock pulses

  constructor(debug: boolean = true) {
    super('Cpu', debug);
    this.log('created');
  }

  pulse(): void {
    this.clockCount++;
    this.log(`received clock pulse - CPU Clock Count: ${this.clockCount}`);
  }
}

