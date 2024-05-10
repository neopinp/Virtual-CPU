interface Buffer {
    enqueue(data: any): void;
    dequeue(): any;
}

export default Buffer;
