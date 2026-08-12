import { AdminTopbar } from "@/components/admin/AdminTopbar";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-ink-900">
      <AdminTopbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
