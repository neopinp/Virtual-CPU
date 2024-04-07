import {Memory} from "./Memory";
import {Cpu} from "./Cpu";

export class MMU {
    private memory: Memory;
    private cpu: Cpu;

    constructor(memory: Memory, cpu: Cpu) {
        this.memory = Memory;
        this.cpu = Cpu;
    }
}