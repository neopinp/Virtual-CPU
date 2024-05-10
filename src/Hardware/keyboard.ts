import Interrupt from "./interrupt";
import InterruptController from "./InterruptController";

class Keyboard implements Interrupt {
    irq: number;
    priority: number;
    name: string;
    outputBuffer: Buffer;
    private interruptController: InterruptController;

    constructor(name: string, irq: number, priority: number, outputBuffer: Buffer, interruptController: InterruptController) {
        this.name = name;
        this.irq = irq;
        this.priority = priority;
        this.outputBuffer = outputBuffer;
        this.interruptController = interruptController;
    }

    triggerInterrupt(): void {
        this.interruptController.acceptInterrupt(this);
    }

    // Method to monitor keys and trigger interrupts
    monitorKeys(): void {
        // Implementation provided in the assignment content
    }
}

export default Keyboard;
