import { sql } from "@vercel/postgres";

async function main() {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL is not set");
  }

  const url = process.env.POSTGRES_URL;
  const isProd =
    !url.includes("localhost") &&
    !url.includes("127.0.0.1") &&
    process.env.NODE_ENV === "production";

  if (isProd && process.env.CONFIRM_RESET !== "yes") {
    throw new Error(
      "Refusing to reset a production-looking database. " +
        "Re-run with CONFIRM_RESET=yes if you really mean it.",
    );
  }

  console.log(`Truncating events + sessions on ${maskUrl(url)} …`);
  await sql`TRUNCATE events, sessions RESTART IDENTITY`;
  console.log("Done.");
}

function maskUrl(u: string): string {
  return u.replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
