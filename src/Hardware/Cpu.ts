import { Hardware } from "./Hardware";
import { ClockListener } from "./Imp/ClockListener";
import { MMU } from "./MMU";

export class Cpu extends Hardware implements ClockListener {
    private pc: number = 0x0000;  // Program Counter
    private ir: number = 0x00;    // Instruction Register
    private accumulator: number = 0x00;
    private xRegister: number = 0x00;
    private yRegister: number = 0x00;
    private zFlag: boolean = false;  // Zero flag for status
    private operand: number = 0x0000; // Store operand
    private step: number = 0; // Current step in the pipeline

    private mmu: MMU | null = null;

    constructor(debug: boolean = true) {
        super('Cpu', debug);
        this.log('CPU created');
    }

    setMMU(mmu: MMU): void {
        this.mmu = mmu;
    }

    pulse(): void {
        switch (this.step) {
            case 0: this.fetch(); break;
            case 1: this.decode(); break;
            case 2: this.execute(); break;
            case 3: this.writeBack(); break;
            case 4: this.interruptCheck(); break;
        }
        this.step = (this.step + 1) % 5; // Move to the next step
        this.logState(); // Log the current state for debugging 
    }

    private fetch(): void {
        if (!this.mmu) throw new Error("MMU not set.");
        this.ir = this.mmu.read(this.pc++);
        this.log(`Fetched: ${this.ir.toString(16)}`);
    }

    private decode(): void {
        switch (this.ir) {
            case 0xA9: // LDA Immediate
                this.operand = this.mmu.read(this.pc++);
                break;
            case 0xAD: // LDA Absolute
                const low = this.mmu.read(this.pc++);
                const high = this.mmu.read(this.pc++);
                this.operand = (high << 8) | low;
                break;
            case 0x8D: // STA Absolute
                const lowSta = this.mmu.read(this.pc++);
                const highSta = this.mmu.read(this.pc++);
                this.operand = (highSta << 8) | lowSta;
                break;
        }
        this.log(`Decoded IR: ${this.ir.toString(16)} with operand: ${this.operand.toString(16)}`);
    }

    private execute(): void {
        switch (this.ir) {
            case 0xA9: // LDA Immediate
                this.accumulator = this.operand;
                this.zFlag = (this.accumulator === 0);
                break;
            case 0xAD: // LDA Absolute
                this.accumulator = this.mmu.read(this.operand);
                this.zFlag = (this.accumulator === 0);
                break;
            case 0x8D: // STA Absolute
                this.mmu.write(this.operand, this.accumulator);
                break;

        }
        this.log(`Executed: A: ${this.accumulator.toString(16)} X: ${this.xRegister.toString(16)} Y: ${this.yRegister.toString(16)} Z: ${this.zFlag}`);
    }

    private writeBack(): void {
        this.log("Write-back completed (if any)");
    }

    private interruptCheck(): void { // Interrput check 
        this.log("Interrupt check completed");
    }

    private logState(): void { //log the current state 
        this.log(`[CPU] PC: ${this.pc.toString(16)} IR: ${this.ir.toString(16)} A: ${this.accumulator.toString(16)} X: ${this.xRegister.toString(16)} Y: ${this.yRegister.toString(16)} Z: ${this.zFlag} Step: ${this.step}`);
    }

    readMemory(address: number): number {
        if (!this.mmu) throw new Error("MMU is not set.");
        return this.mmu.read(address);
    }

    writeMemory(address: number, data: number): void {
        if (!this.mmu) throw new Error("MMU is not set.");
        this.mmu.write(address, data);
    }
}
