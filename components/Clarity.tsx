"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getSessionId } from "@/lib/track";

export default function Clarity({ projectId }: { projectId: string }) {
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("ss_consent");
      setAllow(v === "accepted");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!allow) return;
    if (typeof window === "undefined") return;
    const w = window as unknown as { clarity?: (...args: unknown[]) => void };
    if (typeof w.clarity === "function") {
      try {
        w.clarity("set", "ss_session_id", getSessionId());
      } catch {
        /* ignore */
      }
    }
  }, [allow]);

  if (!projectId || !allow) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}
