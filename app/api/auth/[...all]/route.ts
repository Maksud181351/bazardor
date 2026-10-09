import { auth } from "@/lib/auth";
import { ensureAuthTables } from "@/lib/auth-migrate";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await ensureAuthTables();
  return handler.GET(req);
}

export async function POST(req: Request) {
  await ensureAuthTables();
  return handler.POST(req);
}
