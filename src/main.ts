// main.ts
import { System } from "./System";

const system = new System();
system.startSystem(); // start system 


setTimeout(() => {
  system.stopSystem();
}, 10000); // Stops the system after 10 seconds


