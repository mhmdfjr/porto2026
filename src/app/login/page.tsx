import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-black">
      <form
        action={login}
        className="w-full max-w-sm space-y-4 rounded-lg bg-neutral-900 p-8"
      >
        <h1 className="text-xl font-bold text-white">Admin Login</h1>

        {message && (
          <p className="rounded bg-red-500/10 p-2 text-sm text-red-400">
            {message}
          </p>
        )}

        <div>
          <label className="text-sm text-neutral-300">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border border-neutral-700 bg-neutral-800 p-2 text-white"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">Password</label>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded border border-neutral-700 bg-neutral-800 p-2 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-white py-2 font-semibold text-black"
        >
          Login
        </button>
      </form>
    </div>
  );
}
