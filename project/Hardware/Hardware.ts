// hardware/Hardware.ts
export class Hardware {
  static nextId: number = 0;

  id: number;
  name: string;
  debug: boolean;

  constructor(name: string, debug: boolean = true) {
    this.id = Hardware.nextId++;
    this.name = name;
    this.debug = debug;
  }   

  log(message: string): void {
    if (this.debug) {
      const timestamp = Date.now();
      console.log(`[HW - ${this.name} id: ${this.id} - ${timestamp}]: ${message}`);
    }
  }
}