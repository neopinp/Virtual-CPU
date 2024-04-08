import { Memory } from "./Memory";
import { Cpu } from "./Cpu";

export class MMU {
    private memory: Memory;
    private cpu: Cpu;

    constructor(memory: Memory, cpu: Cpu) {
        this.memory = memory;
        this.cpu = cpu;
    }

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

    public loadROM(program: Array<{ address: number, data: number }>): void {
        program.forEach(instruction => {
            this.write(instruction.address, instruction.data);
        });
        console.log("ROM loaded into memory.");
    }

    public memoryDump(startAddress: number, endAddress: number): void {
        console.log(`Memory Dump from 0x${startAddress.toString(16)} to 0x${endAddress.toString(16)}:`);
        for (let address = startAddress; address <= endAddress; address++) {
            const data = this.read(address);
            console.log(`0x${address.toString(16).padStart(4, '0')}: 0x${data.toString(16).padStart(2, '0')}`);
        }
    }
}
