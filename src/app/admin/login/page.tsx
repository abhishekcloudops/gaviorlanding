import Link from "next/link";
import { signInAction } from "../auth-actions";

const errors: Record<string, string> = {
  invalid_input: "Enter a valid email and password.",
  invalid_credentials: "The email or password is incorrect.",
  not_authorized: "This account has not been approved for admin access.",
};

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <Link href="/" className="admin-brand">GAVIOR</Link>
        <p className="admin-eyebrow">Secure operations</p>
        <h1>Admin sign in</h1>
        <p className="admin-muted">Manage clients, quotations and invoices. Access is restricted to approved accounts.</p>
        {error && <div className="admin-alert admin-alert-error" role="alert">{errors[error] || "Sign in failed."}</div>}
        <form action={signInAction} className="admin-form-stack">
          <label>Email<input name="email" type="email" autoComplete="username" required maxLength={254} /></label>
          <label>Password<input name="password" type="password" autoComplete="current-password" required minLength={8} maxLength={200} /></label>
          <button className="admin-button" type="submit">Sign in securely</button>
        </form>
        <p className="admin-fineprint">Protected by server-validated sessions and database-level access rules.</p>
      </section>
    </main>
  );
}
