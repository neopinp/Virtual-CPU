export interface InterruptInterface {
    irqNumber: number;
    priority: number;
    name: string;
    dataBuffer: string[]; // Generic data buffer used as needed

    handleInterrupt(): void;
}
