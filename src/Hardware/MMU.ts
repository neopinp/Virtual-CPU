// MMU.ts
import { Memory } from "./Memory";
import { Cpu } from "./Cpu";

export class MMU {
    private memory: Memory;
    private cpu: Cpu | null = null; // Initialize as null to be set later

    constructor(memory: Memory) {
        this.memory = memory;
    }

    public setCPU(cpu: Cpu): void {
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

    public memoryDump(startAddress: number, endAddress: number): void {
        console.log(`Memory Dump from 0x${startAddress.toString(16)} to 0x${endAddress.toString(16)}:`);
        for (let address = startAddress; address <= endAddress; address++) {
            const data = this.read(address); // Utilizes MMU's read method
            console.log(`0x${address.toString(16).padStart(4, '0')}: 0x${data.toString(16).padStart(2, '0')}`);
        }
    }

    // New method to load a static program into memory
    public writeImmediate(): void {
        const program = [
            { address: 0x0000, data: 0xA9 },
            { address: 0x0001, data: 0x0D },
            { address: 0x0002, data: 0xA9 },
            { address: 0x0003, data: 0x1D },
            { address: 0x0004, data: 0xA9 },
            { address: 0x0005, data: 0x2D },
            { address: 0x0006, data: 0xA9 },
            { address: 0x0007, data: 0x3F },
            { address: 0x0008, data: 0xA9 },
            { address: 0x0009, data: 0xFF },
            { address: 0x000A, data: 0x00 },
        ];

        // Writing each program instruction into memory
        program.forEach(({ address, data }) => {
            this.write(address, data);
        });

        console.log("Static program loaded into memory.");
    }
}
