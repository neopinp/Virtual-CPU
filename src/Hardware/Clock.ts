// Clock.ts
import { Hardware } from "./Hardware";
import { ClockListener } from "./Imp/ClockListener";

export class Clock extends Hardware {
  private listeners: ClockListener[] = [];
  private intervalId: ReturnType<typeof setInterval> | undefined;

  constructor(debug: boolean = true) {
    super('Clock',debug);
    this.log('created');
  }

  registerListener(listener: ClockListener): void {
    this.listeners.push(listener);
  }

  startClock(interval: number): void {
    this.log('Clock Pulse Initialized');
    this.intervalId = setInterval(() => this.tick(), interval);
  }

  stopClock(): void {
    if (this.intervalId !== undefined) clearInterval(this.intervalId);
  }

  private tick(): void {
    this.listeners.forEach(listener => listener.pulse());
  }
}
