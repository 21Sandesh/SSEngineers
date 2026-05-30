import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="container-x flex min-h-screen items-center justify-center py-16">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
