//Memory.ts
import { Hardware } from "./Hardware"; 
import { ClockListener } from "./Imp/ClockListener";



export class Memory extends Hardware implements ClockListener{
    private memory: Uint8Array;
    pulse(): void {
        this.log('received clock pulse');
    }

    constructor(debug: boolean = true) {
        super("Memory",debug);
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
                // Handle out-of-bounds addresses 
                console.log(`[HW - RAM id: ${this.id}]: Address : ${address.toString(16).toUpperCase()} Contains Value: ERR [hexValue conversion]: number undefined`);
            }
        }
    }
    

}