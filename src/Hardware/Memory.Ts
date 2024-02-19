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


}