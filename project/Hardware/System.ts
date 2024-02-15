import { Cpu } from "./Cpu";
import { Hardware } from "./Hardware";
import { Memory } from "./Memory"; // Import the Memory class

export class System extends Hardware {
  private _CPU: Cpu;
  private memory: Memory; // Add a memory property to the class
  public running: boolean = false;

  constructor() {
    super('System');
    this.debug = true;

    // Instantiate Memory and CPU
    this.memory = new Memory(); // Instantiate the Memory class here
    this._CPU = new Cpu();

    this.log('created');

    this.startSystem();
  }

  public startSystem(): boolean {
    // Initialize memory
    this.memory.initializeMemory(); // Call the initialize method of the Memory class
    // Optionally, display initial memory content to demonstrate that it has been initialized
    this.memory.displayMemory(0x00, 0x14);

    this.log('System started');

    // Proceed with the rest of the system startup process
    // Turn off debugging for CPU as per your existing logic
    this._CPU.debug = false;
    this._CPU.log('created');

    // Mark the system as running
    this.running = true;

    return this.running;
  }

  public stopSystem(): boolean {
    // Implement logic to stop the system, if necessary
    this.running = false;
    return this.running;
  }
}

// Instantiate the System to kick off initialization
let system: System = new System();
