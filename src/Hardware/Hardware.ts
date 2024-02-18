//hardware.ts
export class Hardware {
  static nextId: number = 0;

  id: number;
  name: string;
  debug: boolean;

  constructor(name: string, debug: boolean = true) {
    this.id = Hardware.nextId++; // Increment and assign a unique ID
    this.name = name; 
    this.debug = debug; 
  }   

  log(message: string): void {
    if (this.debug) {
      const timestamp = Date.now();
      console.log(`[HW - ${this.name} id: ${this.id} - ${timestamp}]: ${message}`);
    }
  }

  public hexLog(value: number, length: number = 2): void {
    const hexValue = value.toString(16).toUpperCase().padStart(length, '0'); // 
    console.log(`[HW - ${this.name} id: ${this.id}]: ${hexValue}`);
  }
}
