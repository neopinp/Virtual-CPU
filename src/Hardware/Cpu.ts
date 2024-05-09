import { Hardware } from "./Hardware";
import { ClockListener } from "./Imp/ClockListener";
import { MMU } from "./MMU";

export class Cpu extends Hardware implements ClockListener {
    public pc: number = 0x0000;  // Program Counter
    private ir: number = 0x00;    // Instruction Register
    public accumulator: number = 0x00;
    private xRegister: number = 0x00;
    private yRegister: number = 0x00;
    private zFlag: boolean = false;  // Zero flag for status
    private operand: number = 0x0000; // Store operand
    private step: number = 0; // Current step in the pipeline
    private carryFlag: boolean = false; // Carry flag 
    private mmu: MMU | null = null;
    // toggle logging 
    private clockLog: boolean = false;
    private memoryLog: boolean = false;
    private cpuLog: boolean = true;


    

    constructor(debug: boolean = true) {
        super('Cpu', debug);
        this.log('CPU created', 'cpu');
    }

    setMMU(mmu: MMU): void {
        this.mmu = mmu;
    }

    pulse(): void {
        switch (this.step) {
            case 0: this.fetch(); 
                break;
            case 1: this.decode(); 
                break;
            case 2: this.execute(); 
                break;
            case 3: this.writeBack();
                 break;
            case 4: this.interruptCheck(); 
                break;
        }  
        this.step = (this.step + 1) % 5; // Move to the next step
        this.logState(); // Log the current state for debugging 
        }
        
        
    
    private fetch(): void {
        if (!this.mmu) throw new Error("MMU not set.");
        this.ir = this.mmu.read(this.pc); // Fetch only opcode
        this.pc += 1; // Increment PC by 1 to move past the opcode
    }


    private decode(): void {
        this.operand = 0;
        let operandLength = this.getOperandLength(this.ir) -1;
        for (let i = 0; i < operandLength; i++) {
            let byte = this.mmu.read(this.pc);
            this.operand |= byte << (8 * i);
    }
    this.pc += operandLength; // Move PC past the operands
    this.log(`Decoded IR: ${this.ir.toString(16).toUpperCase()} with operand: ${this.operand}`, 'cpu');

}
   
    //logs based on type 
    public logState(): void {
        const zFlagInt = this.zFlag ? 1 : 0;  
        if (this.cpuLog) {
            this.log(`HW-CPU id:0-${Date.now()}],CPU State|PC:${this.pc.toString()} IR:${this.ir.toString(16)} Acc:${this.accumulator.toString(16)} xReg: ${this.xRegister.toString(16)} yReg: ${this.yRegister.toString(16)} zFlag: ${zFlagInt} Step: ${this.step}`, 'cpu');
        }
        if (this.memoryLog) { 
            this.log(`[HW - MMU id: 0 - ${Date.now()}]`,'memory');
        }
        if (this.clockLog) {
            this.log(`asd`, 'clock');
        }
    } 
    
private getOperandLength(opcode: number): number {
    switch (opcode) {
        case 0xA9: // LDA Immediate
        case 0xA2: // LDX Immediate
        case 0xA0: // LDY Immediate
        case 0x8D: // STA Absolute
        case 0x8E: // STX Absolute
        case 0x8C: // STY Absolute
        case 0x6D: // ADC Absolute
        case 0xEE: // INC Absolute
        case 0xD0: // BNE
        case 0xFF: // SYS
            return 2; // Opcode + Operand
        case 0xAD: // LDA Absolute
        case 0xAE: // LDX Absolute
        case 0xAC: // LDY Absolute
            return 3; // Opcode + Operand (2 bytes)
        default:
            return 1; // Only Opcode
    }
}
    private execute(): void {
        switch (this.ir) {
            case 0xA9: // LDA Immediate
                this.accumulator = this.operand;
                this.zFlag = (this.accumulator === 0);
                this.log(`LDA executed. Accumulator now: ${this.accumulator}`, 'cpu');
                break;
            case 0xAD: // LDA Absolute
                this.accumulator = this.mmu.read(this.operand);
                this.zFlag = (this.accumulator === 0);
                break;
            case 0x8D: // STA Absolute
                this.mmu.write(this.operand, this.accumulator);
                break;
            case 0xA2: // LDX Immediate
                this.xRegister = this.operand;
                this.zFlag = (this.xRegister === 0);
                break;
            case 0xAE: // LDX Absolute
                this.xRegister = this.mmu.read(this.operand);
                this.zFlag = (this.xRegister === 0);
                break;
            case 0xA0: // LDY Immediate
                this.yRegister = this.operand;
                this.zFlag = (this.yRegister === 0);
                break;
            case 0xAC: // LDY Absolute
                this.yRegister = this.mmu.read(this.operand);
                this.zFlag = (this.yRegister === 0);
                break;
            case 0x8E: // STX Absolute
                this.mmu.write(this.operand, this.xRegister);
                break;
            case 0x8C: // STY Absolute
                this.mmu.write(this.operand, this.yRegister);
                break;
            case 0x6D: // ADC Absolute
                let value = this.mmu.read(this.operand);
                let result = this.accumulator + value + (this.carryFlag ? 1 : 0);
                this.carryFlag = result > 0xFF;
                this.accumulator = result & 0xFF;
                this.zFlag = (this.accumulator === 0);
                break;
            case 0xD0: // BNE
                if (!this.zFlag) {
                    this.pc = this.operand;  // Branch to the new address
                }
                break;
            case 0xEE: // INC Absolute
                let memValue = (this.mmu.read(this.operand) + 1) & 0xFF;
                this.mmu.write(this.operand, memValue);
                this.zFlag = (memValue === 0);
                break;
            case 0xEA: // NOP
                // No operation performed
                break;
            case 0x00: // BRK
                // Simulate breakpoint/interrupt handling
                break;
            case 0xFF: // SYS
                this.handleSysCall();
                break;
            default:
                break;
        }
        this.zFlag = (this.accumulator === 0);
    }
    
      
    private writeBack(): void {
        switch (this.ir) {
            case 0x8D: // STA Absolute
            case 0x8E: // STX Absolute
            case 0x8C: // STY Absolute
                break;
            case 0xA9: // LDA Immediate
                this.accumulator = this.operand;  // Confirming the data is written back to the accumulator
                break;
            case 0xA2: // LDX Immediate
                this.xRegister = this.operand;
                break;
            case 0xA0: // LDY Immediate
                this.yRegister = this.operand;
                this.log("Y register updated with immediate value", 'cpu');
                break;
            // Add more cases as per your instruction set needs
        }
    }
    

    private interruptCheck(): void { // Interrput check  MISSING

    }


    private handleSysCall(): void {
        // System call implementation based on SYS instruction
        switch (this.operand) {
            case 1: // Print integer
                console.log(`Print integer: ${this.yRegister}`);
                break;
            case 2: // Print string from memory
                this.printStringFromMemory(this.yRegister);
                break;
            case 3: // Custom operation
                // Additional operations based on your design
                break;
        }
    }

    private printStringFromMemory(address: number): void {
        let result = '';
        let character = this.mmu.read(address);
        while (character != 0) {
            result += String.fromCharCode(character);
            address++;
            character = this.mmu.read(address);
        }
        console.log(result);
    }
  
    
    public log(message: string, type: 'cpu' | 'memory' | 'clock'): void {
        if (!this.debug) return;
        switch (type) {
            case 'cpu':
                if (this.cpuLog) console.log(message);
                break;
            case 'memory':
                if (this.memoryLog) console.log(message);
                break;
            case 'clock':
                if (this.clockLog) console.log(message);
                break;
        }
    }











    public reset(): void {
        this.pc = 0x0000;  // Reset program counter to start position
        this.accumulator = 0x00;  // Reset accumulator
        this.xRegister = 0x00;  // Reset X register
        this.yRegister = 0x00;  // Reset Y register
        this.ir = 0x00;  // Reset instruction register
        this.zFlag = false;  // Reset zero flag
        this.carryFlag = false;  // Reset carry flag
        this.step = 0;  // Reset pipeline step
        console.log("CPU reset.");
    }
    public setPC(address: number): void {
        this.pc = address;
        console.log(`Program counter set to address: 0x${address.toString(16)}`);
    }
    public run(): void {
        try {
            while (true) {
                this.pulse();  // Assuming pulse handles one cycle of fetch-decode-execute
                if (this.ir === 0x00) {  // Check for BRK instruction
                    console.log("BRK - Halt.");
                    break;
                }
            }
        } catch (error) {
            console.error("Error", error);
        }
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


