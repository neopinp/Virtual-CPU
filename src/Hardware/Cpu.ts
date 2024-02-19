// Cpu.ts
import { Hardware } from "./Hardware";
import { ClockListener } from "./Imp/ClockListener";


export class Cpu extends Hardware implements ClockListener {
  private clockCount = 0; // Counter for clock pulses received 

  constructor(debug: boolean = true) {
    super('Cpu', debug); // initialize superclass 
    this.log('created'); // log creation of CPU 
  }

//increments pulse() method 
  pulse(): void {
    this.clockCount++;
    this.log(`received clock pulse - CPU Clock Count: ${this.clockCount}`);
  }
}

