import { NextResponse } from "next/server";

// POST /api/contact
// Works out of the box (logs the enquiry and returns success).
// To email enquiries, add a provider below. Easiest options:
//
//   A) Resend  — `npm i resend`, set RESEND_API_KEY in Vercel env, then
//      uncomment the Resend block.
//   B) Formspree / Web3Forms — point the form fetch at their endpoint instead.
//
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data?.name || !data?.phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    // Always log on the server (visible in Vercel function logs).
    console.log("New enquiry:", data);

    // ── Option A: email via Resend ───────────────────────────
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "S.S. Engineers <enquiries@ssengineers.in>",
    //   to: "ssengineeringpune1@gmail.com",
    //   subject: `New enquiry: ${data.interest || "General"} — ${data.name}`,
    //   text: `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nOrg: ${data.organization}\nInterest: ${data.interest}\n\n${data.message}`,
    // });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
