import { System } from "./System";

const system = new System(true); 

system.mmu.writeImmediate();

setTimeout(() => {
    console.log("Performing memory dump...");
    system.dumpMemory(0x0000, 0x000F); 
}, 1000); 

system.startSystem();

setTimeout(() => {
    system.stopSystem();
}, 10000); 