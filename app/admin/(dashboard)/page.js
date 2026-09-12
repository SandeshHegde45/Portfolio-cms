import { readContent } from "@/lib/data/contentRepository";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const content = await readContent();

  return <AdminDashboard initialContent={content} />;
}
