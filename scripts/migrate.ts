import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

async function main() {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL is not set");
  }
  const db = drizzle(sql);
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migrations applied.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
