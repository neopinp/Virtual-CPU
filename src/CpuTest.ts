import { Cpu } from './Hardware/Cpu';
import { MMU } from './Hardware/MMU';
import { Memory } from './Hardware/Memory';

// Initialize components
const memory = new Memory(true); // Assuming 'true' enables debug mode
const mmu = new MMU(memory);
const cpu = new Cpu(true);

// Set MMU for the CPU
cpu.setMMU(mmu);

// Define a simple program to test LDA (Load Accumulator)
const program = [
    { address: 0x0000, data: 0xA9 }, // LDA Immediate opcode
    { address: 0x0001, data: 0x42 }, // Load value 0x42 into the accumulator
    { address: 0x0002, data: 0xA9 }, // LDA Immediate opcode
    { address: 0x0003, data: 0x85 }, // Load value 0x85 into the accumulator
    { address: 0x0004, data: 0x00 }  // BRK opcode to stop execution
];

// Load the program into memory
program.forEach(instruction => {
    mmu.writeImmediate(instruction.address, instruction.data);
});

// Prepare the CPU for execution
cpu.reset();
cpu.setPC(0x0000);

// Execute the program
cpu.run();

// Output the CPU state after execution to verify the results
console.log(`Final Accumulator Value: 0x${cpu.accumulator.toString(16)}`);
mmu.memoryDump(0x0000, 0x0002); // Dump memory from 0x0000 to 0x0002
