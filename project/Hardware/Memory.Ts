import { Hardware } from "./Hardware"; 
//import class 

export class Memory extends Hardware {
    private memory: Uint8Array;

    constructor() {
        super("Memory");
        this.memory = new Uint8Array(65536); // Initialize the memory array with 64K size
    }

    public initializeMemory(): void {
        this.memory.fill(0x00); 
    }

    public displayMemory(startAddress: number, endAddress: number): void {
        for (let address = startAddress; address <= endAddress; address++) {
            if (address < this.memory.length) {
                this.hexLog(address, 4); // Adjust length as needed
                console.log(` Contains Value: ${this.memory[address].toString(16).toUpperCase().padStart(2, '0')}`);
            } else {
                // Handle out-of-bounds addresses gracefully
                console.log(`[HW - RAM id: ${this.id}]: Address : ${address.toString(16).toUpperCase()} Contains Value: ERR [hexValue conversion]: number undefined`);
            }
        }
    }
    

    // Your additional methods will go here
}