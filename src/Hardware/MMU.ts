import { Memory } from "./Memory";
import { Cpu } from "./Cpu";

export class MMU {
    private memory: Memory;
    private cpu: Cpu;

    constructor(memory: Memory, cpu: Cpu) {
        this.memory = memory;
        this.cpu = cpu;
    }

    // Existing methods
    public read(address: number): number {
        return this.memory.read(address);
    }

    public write(address: number, data: number): void {
        this.memory.write(address, data);
    }
    

    public getAddressFromParts(lowByte: number, highByte: number): number {
        return (highByte << 8) | lowByte;
    }

    public readIndirect(address: number): number {
        const lowByte = this.read(address);
        const highByte = this.read(address + 1);
        const fullAddress = this.getAddressFromParts(lowByte, highByte);
        return this.read(fullAddress);
    }

    public writeIndirect(address: number, data: number): void {
        const lowByte = this.read(address);
        const highByte = this.read(address + 1);
        const fullAddress = this.getAddressFromParts(lowByte, highByte);
        this.write(fullAddress, data);
    }

    public translateLogicalToPhysical(logicalAddress: number): number {
        return logicalAddress; 
    }
}
