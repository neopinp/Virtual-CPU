import { Memory } from "./Hardware/Memory"; // Import Memory if it's a separate class
import { MMU } from "./Hardware/MMU";
import { Cpu } from "./Hardware/Cpu"; // Ensure all imports match your file structure
const memory = new Memory(); // Instantiate Memory with default size
const mmu = new MMU(memory);
const cpu = new Cpu(mmu, true); // Enable debugging


/*ADC 
const startAddress = 0x0100;
memory.write(startAddress, 0x6D); // ADC opcode
memory.write(startAddress + 1, 0x01); // Operand address low byte
memory.write(startAddress + 2, 0x00); // Operand address high byte (forming 0x0001)
*/




// Value to be added
memory.write(0x0001, 0x05);

// Prepare CPU and execute
cpu.reset();
cpu.accumulator = 0x03; // Set initial accumulator value
mmu.writeImmediate(0x6D, 0x0005); // Execute ADC at address 0x0001

// Log final state
console.log(`Final State: Accumulator = 0x${cpu.accumulator.toString(16)}, Carry = ${cpu.carry}`);
mmu.memoryDump(0x0000, 0x0010); // Dump memory from 0x0000 to 0x0002