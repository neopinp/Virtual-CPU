// Memory.ts
import { Hardware } from "./Hardware"; 
import { ClockListener } from "./Imp/ClockListener";

export class Memory extends Hardware implements ClockListener {
    private memory: Uint8Array; // Memory storage by an array of bytes 

    constructor(debug: boolean = true) {
        super("Memory", debug); // initialize superclass 
        this.memory = new Uint8Array(65536); // Initialize memory array with 64K size
    }

    // Logs clock pulses 
    pulse(): void {
        this.log('received clock pulse');
    }

    // Initialize memory with all zeros
    public initializeMemory(): void {
        this.memory.fill(0x00); 
    }


public displayMemory(startAddress: number, endAddress: number): void {
    for (let address = startAddress; address <= endAddress; address++) {
        if (address < this.memory.length) {
            // Log both address and data using the adjusted hexLog method
            this.hexLog(address, this.memory[address]);
        } else {
            // Handle out-of-bounds addresses by logging an error
            this.hexLog(address, undefined, 4, 0); // No data to display for out-of-bounds
        }
    }
}
