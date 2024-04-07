import { Hardware } from "./Hardware"; 
import { ClockListener } from "./Imp/ClockListener";

export class Memory extends Hardware implements ClockListener {
    private memory: Uint8Array;
    private mar: number = 0x0000; 
    private mdr: number = 0x00;   

    constructor(debug: boolean = true) {
        super("Memory", debug);
        this.memory = new Uint8Array(65536);
        this.reset();
        this.log(`Memory initialized with addressable space: ${this.memory.length}`);
    }

    pulse(): void {
        this.log('Received clock pulse');
    }

    public reset(): void {
        this.memory.fill(0x00);
        this.mar = 0x0000;
        this.mdr = 0x00;
        this.log("Memory and registers reset to default states.");
    }

  
    public write(): void {
        this.memory[this.mar] = this.mdr;
        this.log(`Write: Data 0x${this.mdr.toString(16).toUpperCase()} to MAR: 0x${this.mar.toString(16).toUpperCase()}.`);
    }

    public displayMemory(startAddress: number, endAddress: number): void {
        //added address to be displayed with data 
        this.log(`Displaying memory from address ${startAddress} to ${endAddress}`);
        for (let address = startAddress; address <= endAddress; address++) {
            if (address < this.memory.length) {
                this.hexLog(address, this.memory[address]);
            } else {
                this.hexLog(address, undefined, 4, 0);
            }
        }
    }

    public hexLog(address: number, data?: number, addressLength: number = 4, dataLength: number = 2): void {
        const hexAddress = address.toString(16).toUpperCase().padStart(addressLength, '0');
        let message = `Address: ${hexAddress}`;
        
        if (data !== undefined) {
            const hexData = data.toString(16).toUpperCase().padStart(dataLength, '0');
            message += ` contains value: ${hexData}`;
        } else {
            message += " contains value: ERR";
        }

        this.log(message); 
    }
}
