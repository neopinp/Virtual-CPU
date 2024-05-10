import Interrupt from "./interrupt";

class InterruptController {
    private hardware: Interrupt[] = [];
    private waitingInterrupts: Interrupt[] = [];

    addHardware(device: Interrupt): void {
        this.hardware.push(device);
    }

    removeHardware(device: Interrupt): void {
        const index = this.hardware.indexOf(device);
        if (index !== -1) {
            this.hardware.splice(index, 1);
        }
    }

    acceptInterrupt(interrupt: Interrupt): void {
        this.waitingInterrupts.push(interrupt);
    }

    handleInterrupts(): Interrupt | undefined {
        if (this.waitingInterrupts.length === 0) return undefined;

        this.waitingInterrupts.sort((a, b) => b.priority - a.priority);
        return this.waitingInterrupts.shift();
    }
}

export default InterruptController;
