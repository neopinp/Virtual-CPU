import { Cpu } from "./Hardware/Cpu";
import { MMU } from "./Hardware/MMU";
import { Memory } from "./Hardware/Memory";
class LDATest {
    run() {
        // Create a CPU instance
        const cpu = new Cpu();

        // Create an MMU instance
        const memory = new Memory();
        const mmu = new MMU(memory);

        // Set the MMU for the CPU
        cpu.setMMU(mmu);

        // Toggle logging configurations
        cpu.toggleClockLog(); // Set at false 
        cpu.toggleMemoryLog(); // Set at false 
        cpu.toggleCpuLog(); // Set at true 

        // Define test data
        const testValue = 0x42; // Test value for the LDA Immediate instruction

        // Initialize memory with the test program and data
        mmu.write(cpu.pc, 0xA9); // Opcode for LDA Immediate
        mmu.write(cpu.pc + 1, testValue); // Immediate operand

        // Run the CPU pulse to execute the instruction
        cpu.pulse();

        // Verify the result
        if (cpu.accumulator !== testValue) {
            console.error(`Test failed for LDA Immediate. Expected ${testValue.toString(16)}, got ${cpu.accumulator.toString(16)}.`);
        } else {
            console.log(`Test passed for LDA Immediate. Accumulator contains ${testValue.toString(16)}.`);
        }
    }
}

// Run the test
const ldaTest = new LDATest();
ldaTest.run();
