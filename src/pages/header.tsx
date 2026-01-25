import { useEffect, useState } from "react";
import * as auth from "../api/auth"; // Replace with your actual auth module
import type { User } from "../types/User";

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current auth state once
  useEffect(() => {
    auth.getUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async () => {
    await auth.login(); // e.g., redirect to OAuth flow or popup
    const newUser = await auth.getUser();
    setUser(newUser);
  };

  const handleLogout = async () => {
    await auth.logout();
    setUser(null);
  };

  return (
    <header className="bg-zinc-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">AREDL Coordination</h1>

        <div>
          {loading ? (
            <span className="text-sm text-gray-400">Loading...</span>
          ) : (user !== null) ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-md text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}