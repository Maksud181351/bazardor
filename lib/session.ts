import "server-only";
import { headers } from "next/headers";
import { auth } from "./auth";
import { ensureAuthTables } from "./auth-migrate";

export async function getServerSession() {
  await ensureAuthTables();
  return auth.api.getSession({ headers: await headers() });
}
