import Link from "next/link";

export default function NotFound() { return <div className="panel mx-auto max-w-lg rounded-md p-10 text-center"><p className="font-mono text-sm text-muted">404</p><h1 className="mt-2 text-lg font-semibold">Resource not found</h1><p className="mt-2 text-sm text-muted">The requested VMLift resource does not exist in this demo inventory.</p><Link href="/" className="button-primary mt-5">Return to dashboard</Link></div>; }
