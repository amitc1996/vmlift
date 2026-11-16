"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Use at least 3 characters."),
  endpoint: z.string().min(1, "Enter a vCenter hostname or URL.").refine(value => !value.includes(" "), "Endpoint cannot contain spaces."),
  username: z.string().min(1, "Enter a username."),
  password: z.string().min(8, "Password or secret reference must be at least 8 characters."),
  tlsVerification: z.boolean(),
});
type FormValues = z.infer<typeof schema>;

export function ConnectionForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [testState, setTestState] = useState<"idle" | "testing" | "success">("idle");
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { tlsVerification: true } });
  async function testConnection() { if (!(await trigger())) return; setTestState("testing"); window.setTimeout(() => setTestState("success"), 1100); }
  async function save() { await new Promise(resolve => setTimeout(resolve, 650)); setSaved(true); }
  if (saved) return <div className="panel rounded-md p-8 text-center"><CheckCircle2 size={36} className="mx-auto text-emerald-600" /><h2 className="mt-3 text-base font-semibold">Connection saved to this demo session</h2><p className="mx-auto mt-1 max-w-md text-sm text-muted">No credentials were transmitted or persisted. Backend connection storage will be enabled when the Go API is integrated.</p><Link href="/connections" className="button-primary mt-5">Return to connections</Link></div>;
  return <form onSubmit={handleSubmit(save)} className="space-y-5" noValidate>
    <section className="panel rounded-md"><div className="border-b border-line px-5 py-4"><h2 className="text-sm font-semibold">Connection details</h2><p className="mt-1 text-xs text-muted">Provide the vCenter Server endpoint and an account with read access.</p></div><div className="grid gap-5 p-5 md:grid-cols-2">
      <Field label="Connection name" error={errors.name?.message}><input className="field" placeholder="Production vCenter" {...register("name")} /></Field>
      <Field label="vCenter endpoint" error={errors.endpoint?.message}><input className="field font-mono" placeholder="vcenter01.corp.example" {...register("endpoint")} /></Field>
      <Field label="Username" error={errors.username?.message}><input className="field" autoComplete="username" placeholder="svc-vmlift@vsphere.local" {...register("username")} /></Field>
      <Field label="Password or secret reference" error={errors.password?.message}><div className="relative"><input className="field pr-10" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Enter credential" {...register("password")} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-0 grid h-9 w-9 place-items-center text-muted" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div><p className="mt-1.5 text-xs text-muted">Credentials are write-only and are never returned by the API.</p></Field>
    </div></section>
    <section className="panel rounded-md"><div className="border-b border-line px-5 py-4"><h2 className="text-sm font-semibold">Transport security</h2></div><label className="flex cursor-pointer items-start gap-3 p-5"><input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-line text-blue-600" {...register("tlsVerification")} /><span><span className="flex items-center gap-2 text-sm font-medium"><ShieldCheck size={16} />Verify server TLS certificate</span><span className="mt-1 block text-xs leading-5 text-muted">Recommended. Disable only for a controlled environment using a known self-signed certificate.</span></span></label></section>
    {testState === "success" && <div className="flex items-start gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"><CheckCircle2 size={18} className="mt-0.5" /><div><p className="text-sm font-medium">Demo validation completed</p><p className="mt-0.5 text-xs">Form inputs are valid. No network request was made to vCenter.</p></div></div>}
    <div className="flex flex-col-reverse justify-end gap-2 border-t border-line pt-5 sm:flex-row"><Link href="/connections" className="button-secondary">Cancel</Link><button type="button" onClick={testConnection} disabled={testState === "testing"} className="button-secondary">{testState === "testing" && <Loader2 size={15} className="animate-spin" />}Test connection</button><button type="submit" disabled={isSubmitting} className="button-primary">{isSubmitting && <Loader2 size={15} className="animate-spin" />}Save connection</button></div>
  </form>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label><span className="label">{label}</span>{children}{error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}</label>; }
