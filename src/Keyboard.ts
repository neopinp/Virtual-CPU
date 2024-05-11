import { Hardware } from "./Hardware/Hardware";
import { InterruptController } from "./Hardware/InterruptController";
import { InterruptibleHardware } from "./Hardware/InterruptibleHardware"; 


export class Keyboard extends Hardware implements InterruptibleHardware {
    irq: number;
    priority: number;
    inputBuffer: any[] = [];
    outputBuffer: any[] = [];

    constructor(debug: boolean, private interruptController: InterruptController) {
        super('Keyboard', debug);
        this.irq = 1;  // Define appropriate IRQ number
        this.priority = 1;  // Define appropriate priority
        this.monitorKeys();
    }

    private monitorKeys() {
        const stdin = process.stdin;
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');

        stdin.on('data', (key: Buffer) => {
            let keyPressed = key.toString();
            this.log(`Key pressed - ${keyPressed}`);

            if (key.toString() === '\u0003') {  // Compare string representations
                process.exit();
            }

            this.outputBuffer.push(keyPressed);
            this.interruptController.acceptInterrupt(this);
        });
    }

    generateInterrupt() {
        if (this.outputBuffer.length > 0) {
            this.interruptController.acceptInterrupt(this);
        }
    }
}
