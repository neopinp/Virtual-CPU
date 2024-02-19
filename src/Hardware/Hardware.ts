// hardware.ts
export class Hardware {
  static nextId: number = 0; //unique ID 

  id: number;
  name: string;
  debug: boolean; // if true: logging is enabled 

  constructor(name: string, debug: boolean = true) {
    this.id = Hardware.nextId++; // increment and assign 
    this.name = name; // set name 
    this.debug = debug; 
  }   

//logs message if debugging is enabled 
  log(message: string): void {
    if (this.debug) {
      const timestamp = Date.now();
      console.log(`[HW - ${this.name} id: ${this.id} - ${timestamp}]: ${message}`);
    }
  }

// logs hex value 
  public hexLog(value: number, length: number = 2): void {
    const hexValue = value.toString(16).toUpperCase().padStart(length, '0');
    console.log(`[HW - ${this.name} id: ${this.id}]: ${hexValue}`);
  }
}
