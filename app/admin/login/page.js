import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-6">
      <LoginForm />
    </div>
  );
}
