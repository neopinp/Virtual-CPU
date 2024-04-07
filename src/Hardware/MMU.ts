import {Memory} from "./Memory";
import {Cpu} from "./Cpu";

export class MMU {
    private memory: Memory;
    private cpu: Cpu;

    constructor(memory: Memory, cpu: Cpu) {
        this.memory = memory;
        this.cpu = cpu;
    }

    public getAddressFromParts(lowByte: number, highByte: number): number {
        // Assuming little-endian format
        return (highByte << 8) | lowByte;
    }
    
    
}   