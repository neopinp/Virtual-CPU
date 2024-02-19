//Memory.ts
import { Hardware } from "./Hardware"; 
import { ClockListener } from "./Imp/ClockListener";



export class Memory extends Hardware implements ClockListener{
    private memory: Uint8Array; // Memory storage by an array of bytes 

//Logs clock pulses 
    pulse(): void {
        this.log('received clock pulse');
    }

    constructor(debug: boolean = true) {
        super("Memory",debug); // initialize superclass 
        this.memory = new Uint8Array(65536); // Initialize  memory array with 64K size
    }

//Initalize 
    public initializeMemory(): void {
        this.memory.fill(0x00); 
    }

// displays memory from Start to End 
    public displayMemory(startAddress: number, endAddress: number): void {
        for (let address = startAddress; address <= endAddress; address++) {
            if (address < this.memory.length) {
                this.hexLog(address, 4); // log address in hex 
                console.log(` Contains Value: ${this.memory[address].toString(16).toUpperCase().padStart(2, '0')}`);
            } else {
                // Handle out-of-bounds addresses 
                console.log(`[HW - RAM id: ${this.id}]: Address : ${address.toString(16).toUpperCase()} Contains Value: ERR [hexValue conversion]: number undefined`);
            }
        }
    }
    

}