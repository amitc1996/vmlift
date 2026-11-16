import { ConnectionForm } from "@/components/connection-form";
import { PageHeader } from "@/components/page-header";

export default function NewConnectionPage() {
  return <div className="mx-auto max-w-4xl space-y-5"><PageHeader title="Add VMware connection" description="Configure access to a VMware vCenter Server for inventory discovery." /><div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300"><span className="font-medium">Demo mode:</span> this form validates locally. It does not contact vCenter or retain credentials.</div><ConnectionForm /></div>;
}
