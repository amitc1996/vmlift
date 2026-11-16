import { Download, RefreshCw } from "lucide-react";
import { InventoryTable } from "@/components/inventory-table";
import { PageHeader } from "@/components/page-header";
import { virtualMachines } from "@/lib/mock-data";

const tabs = ["Virtual Machines", "Datacenters", "Clusters", "ESXi Hosts", "Datastores", "Networks"];

export default function InventoryPage() {
  return <div className="space-y-5"><PageHeader title="VMware inventory" description="Discovered resources from Production vCenter · Last scan 18 minutes ago." actions={<><a className="button-secondary" download="vmlift-inventory-demo.csv" href="data:text/csv;charset=utf-8,Name%2CPower%20State%2CCluster%0Aprod-web-01%2CPowered%20on%2CCompute-Prod-A%0Aerp-db-primary%2CPowered%20on%2CCompute-Prod-B"><Download size={16} />Export</a><button disabled title="Discovery workflow is planned for Phase 2" className="button-primary"><RefreshCw size={16} />Run discovery</button></>} />
    <div className="overflow-x-auto border-b border-line"><nav className="flex min-w-max gap-5" aria-label="Inventory type">{tabs.map((tab, index) => <button key={tab} disabled={index > 0} className={`border-b-2 px-1 pb-2.5 text-sm ${index === 0 ? "border-blue-600 font-medium text-blue-600" : "border-transparent text-muted disabled:cursor-not-allowed disabled:opacity-60"}`}>{tab}</button>)}</nav></div>
    <InventoryTable data={virtualMachines} />
  </div>;
}
