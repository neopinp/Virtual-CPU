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


    public setLowOrderByte(address: number, lowByte: number): void {
        let highByte = this.read(address + 1);
        let fullAddress = (highByte << 8) | lowByte;
        this.memory.write(address, fullAddress);
    }

    public setHighOrderByte(address: number, highByte: number): void {
        let lowByte = this.read(address);
        let fullAddress = (highByte << 8) | lowByte;
        this.memory.write(address + 1, fullAddress);
    }


 // load a static program into memory
public writeImmediate(address: number, data: number): void {
    console.log(`Writing to address ${address.toString(16)}: ${data.toString(16)}`);        this.memory.write(address, data);
}

//memory dump
public memoryDump(startAddress: number, endAddress: number): void {
    console.log(`[HW - MMU id: 0 - ${Date.now()}]: Memory Dump: Debug`);
    console.log(`[HW - MMU id: 0 - ${Date.now()}]: --------------------------------------`);
    for (let address = startAddress; address <= endAddress; address++) {
        const data = this.read(address);
        console.log(`[HW - MMU id: 0 - ${Date.now()}]: Addr ${address.toString(16).padStart(4, '0')}: | ${data.toString(16).toUpperCase()}`);
    }
    console.log(`[HW - MMU id: 0 - ${Date.now()}]: --------------------------------------`);
    console.log(`[HW - MMU id: 0 - ${Date.now()}]: Memory Dump: Complete`); 
    }
}


