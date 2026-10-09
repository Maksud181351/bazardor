import { getMigrations } from "better-auth/db/migration";
import { auth } from "./auth";

let ready: Promise<void> | null = null;

/**
 * Creates the Better Auth tables on first use so the deployed app works
 * without a manual migration step. Runs once per server instance.
 */
export function ensureAuthTables(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      const { runMigrations } = await getMigrations(auth.options);
      await runMigrations();
    })().catch((err) => {
      ready = null; // retry on next request
      throw err;
    });
  }
  return ready;
}
