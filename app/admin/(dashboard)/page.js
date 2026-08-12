import { readContent } from "@/lib/data/contentRepository";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminDashboardPage() {
  const content = await readContent();

  return <AdminDashboard initialContent={content} />;
}
