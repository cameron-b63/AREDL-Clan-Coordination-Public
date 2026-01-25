// Auth wrapper

import type { User } from "../types/User";

// Mock stuff
// const fakeUser = {
//     id: "3024984572304985783240958",
//     username: "TestUser",
//     is_admin: false,
//     lastLogin: new Date().toISOString(),
// };

// let isLoggedIn = false;

// export async function getUser() {
//     return isLoggedIn ? fakeUser : null;
// }

// export async function login() {
//     console.log("Mock login triggered");
//     isLoggedIn = true;
// }

// export async function logout() {
//     console.log("Mock logout triggered");
//     isLoggedIn = false;
// }

export async function login() {
  // Redirect to OAuth or open popup
  window.location.href = "https://zelfmonco.xyz:7145/login";
}

export async function logout() {
    window.location.href = "https://zelfmonco.xyz:7145/logout";
}

export async function getUser(): Promise<User | null> {
  const res = await fetch("https://zelfmonco.xyz:7145/auth/me", {credentials: "include"});
  if (!res.ok) return null;
  const data: User = await res.json();
  return data;
}