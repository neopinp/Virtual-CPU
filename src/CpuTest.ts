import { Cpu } from './Hardware/Cpu';
import { MMU } from './Hardware/MMU';
import { Memory } from './Hardware/Memory';
const memory = new Memory(true); // Assuming 'true' enables debug mode // Remove the "_1" suffix
const mmu = new MMU(memory);
const cpu = new Cpu(true);
cpu.setMMU(mmu);


/* AD LDA MEMORY
const program = [
    { address: 0x0000, data: 0xAD }, // LDA Absolute opcode
    { address: 0x0001, data: 0x06 }, // Low byte of the memory address to load from
    { address: 0x0002, data: 0x00 }, // High byte of the memory address to load from
    { address: 0x0003, data: 0x00 }, // BRK opcode to stop execution
    { address: 0x0006, data: 0x07 }  // Value at memory address 0x0006 to load into the accumulator
];

// 8D STA MEMORY

const program = [
    { address: 0x0000, data: 0xA9 }, // LDA Immediate opcode
    { address: 0x0001, data: 0x07 }, // Value to load into the accumulator
    { address: 0x0002, data: 0x8D }, // STA Absolute opcode
    { address: 0x0003, data: 0x06 }, // Low byte of the memory address to store to
    { address: 0x0004, data: 0x00 }, // High byte of the memory address to store to
    { address: 0x0005, data: 0x00 }  // BRK opcode to stop execution
];

//TESTING 8A 
const program = [
    { address: 0x0000, data: 0xA2 }, // LDX Immediate opcode
    { address: 0x0001, data: 0x07 }, // Value to load into the X register
    { address: 0x0002, data: 0x8A }, // TXA opcode
    { address: 0x0003, data: 0x00 }  // BRK opcode to stop execution
];



TESING 98 
const program = [
    0xA0, 0x07,  // LDY #$07
    0x98,        // TYA
    0x00         // BRK
];


TESTING 6D 
const program = [
    { address: 0x0000, data: 0x05 }, // Value 0x05 at memory address 0x0000
    { address: 0x0001, data: 0x07 }, // Value 0x07 at memory address 0x0001
    { address: 0x0002, data: 0x6D }, // ADC Absolute opcode
    { address: 0x0003, data: 0x00 }, // Low byte of the address
    { address: 0x0004, data: 0x00 }, // High byte of the address
    { address: 0x0005, data: 0x00 }  // BRK opcode to stop execution
];
TESTING A2
const program = [
    { address: 0x0000, data: 0xA2 }, // LDX Immediate opcode
    { address: 0x0001, data: 0x07 }, // Value to load into the X register
    { address: 0x0002, data: 0x00 }  // BRK opcode to stop execution
];




const program = [
    { address: 0x0000, data: 0xA0 }, // LDY Immediate opcode
    { address: 0x0001, data: 0x07 }, // Value to load into the Y register
    { address: 0x0002, data: 0x00 }  // BRK opcode to stop execution
];


TESTING AC
const program = [
    { address: 0x0000, data: 0xAC }, // LDY Absolute opcode
    { address: 0x0001, data: 0x05 }, // Low byte of the memory address
    { address: 0x0002, data: 0x00 }, // High byte of the memory address
    { address: 0x0003, data: 0x00 }, // BRK opcode to stop execution
    { address: 0x0005, data: 0x07 }  // Value to load into the Y register
];
TESTING A8 
const program = [
    { address: 0x0000, data: 0xA9 }, // LDA Immediate opcode
    { address: 0x0001, data: 0x07 }, // Value to load into the accumulator
    { address: 0x0002, data: 0xA8 }, // TAY opcode
    { address: 0x0003, data: 0x00 }  // BRK opcode to stop execution
];
*
TESTING EA
const program = [
    { address: 0x0000, data: 0xEA }, // NOP opcode
    { address: 0x0001, data: 0x00 }  // BRK opcode to stop execution
];

TESTING D0
*/
const program = [
    { address: 0x0000, data: 0xA9 }, // LDA Immediate opcode
    { address: 0x0001, data: 0x01 }, // Value to load into the accumulator
    { address: 0x0002, data: 0xD0 }, // BNE opcode
    { address: 0x0003, data: 0x01 }, // Relative address to branch to if zero flag is clear
    { address: 0x0004, data: 0x00 } // BRK opcode to stop execution
];
program.forEach(({ address, data }) => {
    mmu.writeImmediate(address, data);
});

cpu.setPC(0x0000);
cpu.run();


// Output the CPU state after execution to verify the results
console.log(`Final Accumulator Value: 0x${cpu.accumulator.toString(16)}`);
mmu.memoryDump(0x0000, 0x000A); // Dump memory from 0x0000 to 0x0006
