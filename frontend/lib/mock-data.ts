import type { Connection, VirtualMachine } from "./types";

export const connections: Connection[] = [
  { id: "vc-prod-01", provider: "VMware vCenter", name: "Production vCenter", target: "vcenter01.corp.example", health: "healthy", lastValidated: "8 minutes ago" },
  { id: "aws-use1", provider: "Amazon Web Services", name: "AWS Production", target: "us-east-1", health: "healthy", lastValidated: "12 minutes ago" },
  { id: "vc-dr-01", provider: "VMware vCenter", name: "DR vCenter", target: "vcenter-dr.corp.example", health: "warning", lastValidated: "2 hours ago" },
];

export const virtualMachines: VirtualMachine[] = [
  { id: "vm-1024", name: "prod-web-01", powerState: "Powered on", guestOs: "Ubuntu Linux (64-bit)", vcpu: 4, memoryGb: 16, storageGb: 180, network: "VLAN-120-PROD", cluster: "Compute-Prod-A", assessment: "Ready", ipAddress: "10.42.12.21", host: "esx-prod-03.corp.example", datastore: "vsan-prod-01" },
  { id: "vm-1025", name: "prod-web-02", powerState: "Powered on", guestOs: "Ubuntu Linux (64-bit)", vcpu: 4, memoryGb: 16, storageGb: 180, network: "VLAN-120-PROD", cluster: "Compute-Prod-A", assessment: "Ready", ipAddress: "10.42.12.22", host: "esx-prod-04.corp.example", datastore: "vsan-prod-01" },
  { id: "vm-1108", name: "erp-db-primary", powerState: "Powered on", guestOs: "Red Hat Enterprise Linux 8", vcpu: 16, memoryGb: 128, storageGb: 2048, network: "VLAN-210-DATA", cluster: "Compute-Prod-B", assessment: "Review", ipAddress: "10.42.21.10", host: "esx-prod-07.corp.example", datastore: "san-tier1-02" },
  { id: "vm-1184", name: "legacy-file-01", powerState: "Powered on", guestOs: "Windows Server 2012 R2", vcpu: 8, memoryGb: 32, storageGb: 4096, network: "VLAN-145-SERVICES", cluster: "Compute-Legacy", assessment: "Blocked", ipAddress: "10.42.14.55", host: "esx-legacy-02.corp.example", datastore: "san-tier2-04" },
  { id: "vm-1201", name: "dev-ci-runner-03", powerState: "Powered off", guestOs: "Ubuntu Linux (64-bit)", vcpu: 8, memoryGb: 32, storageGb: 300, network: "VLAN-310-DEV", cluster: "Compute-Dev", assessment: "Not assessed", ipAddress: "10.42.31.43", host: "esx-dev-01.corp.example", datastore: "vsan-dev-01" },
  { id: "vm-1226", name: "monitoring-01", powerState: "Powered on", guestOs: "Rocky Linux 9", vcpu: 8, memoryGb: 32, storageGb: 800, network: "VLAN-145-SERVICES", cluster: "Compute-Prod-A", assessment: "Ready", ipAddress: "10.42.14.12", host: "esx-prod-02.corp.example", datastore: "vsan-prod-01" },
];

export const activity = [
  { id: 1, action: "Discovery completed", detail: "Production vCenter · 248 virtual machines", time: "18 minutes ago", status: "healthy" as const },
  { id: 2, action: "Assessment requires review", detail: "ERP Modernization · 3 workload findings", time: "43 minutes ago", status: "warning" as const },
  { id: 3, action: "Connection validation failed", detail: "DR vCenter · certificate has expired", time: "2 hours ago", status: "critical" as const },
  { id: 4, action: "Inventory export generated", detail: "VMware inventory · CSV", time: "Yesterday, 16:42", status: "inactive" as const },
];
