export type Health = "healthy" | "warning" | "critical" | "inactive";
export type Assessment = "Ready" | "Review" | "Blocked" | "Not assessed";

export interface Connection {
  id: string;
  provider: "VMware vCenter" | "Amazon Web Services";
  name: string;
  target: string;
  health: Health;
  lastValidated: string;
}

export interface VirtualMachine {
  id: string;
  name: string;
  powerState: "Powered on" | "Powered off";
  guestOs: string;
  vcpu: number;
  memoryGb: number;
  storageGb: number;
  network: string;
  cluster: string;
  assessment: Assessment;
  ipAddress: string;
  host: string;
  datastore: string;
}
