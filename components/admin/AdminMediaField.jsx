"use client";

import { useState } from "react";
import { AdminTextField } from "@/components/admin/AdminTextField";

export function AdminMediaField({ label, accept, onChange, ...rest }) {
  const [status, setStatus] = useState("idle");

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Upload failed.");
      onChange({ target: { name: rest.name, value: data.url } });
      setStatus("uploaded");
    } catch (error) {
      setStatus(error.message || "Upload failed.");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <AdminTextField label={label} onChange={onChange} {...rest} />
      <label className="font-mono text-xs uppercase tracking-wide text-ink-400">
        Upload file
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="mt-2 block w-full font-body text-sm text-ink-300 file:mr-3 file:rounded-lg file:border-0 file:bg-ink-700 file:px-3 file:py-2 file:font-body file:text-sm file:text-ink-100 hover:file:bg-ink-600"
        />
      </label>
      {status === "uploading" ? <span className="font-mono text-xs text-ink-400">Uploading...</span> : null}
      {status === "uploaded" ? <span className="font-mono text-xs text-wire-400">Uploaded. Save this section to keep it.</span> : null}
      {status !== "idle" && status !== "uploading" && status !== "uploaded" ? (
        <span className="font-mono text-xs text-signal-500">{status}</span>
      ) : null}
    </div>
  );
}