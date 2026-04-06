import { getUser } from "./auth";
import { backendUrl } from "./config";

export type SendClaimResult =
  | { ok: true }
  | { ok: false; status: number };

export async function sendClaim(levelId: string, strength: number): Promise<SendClaimResult> {
  const user = await getUser();

  const res = await fetch(backendUrl("/api/sendClaim"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: levelId,
      discord_id: user?.discordId,
      discord_username: user?.username,
      strength,
    }),
    credentials: "include",
  });

  if (!res.ok) {
    return { ok: false, status: res.status };
  }

  return { ok: true };
}
