import type { Metadata } from "next";
import { headers, cookies } from "next/headers";
import { CspToggle } from "@/app/components/CspToggle";
import { parseCspMode, CSP_COOKIE } from "@/lib/csp";
import './globals.css'

export const metadata: Metadata = {
  title: 'CSP Nonce Demo',
  description: 'How CSP nonces stop XSS in Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // server component - can read request headers and cookies 
  const nonce = (await headers()).get('x-nonce') ?? ''
  const mode = parseCspMode((await cookies()).get(CSP_COOKIE)?.value)

  return (
    <html lang="en">
      <head>
        {/* a trusted inline style, to prove styles honor the nonce too */}
        <style nonce={nonce}>{`
          body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; line-height: 1.5; }
          .csp-toggle { display: flex; gap: .5rem; align-items: center; flex-wrap: wrap;
            padding: .75rem 1rem; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1.5rem; }
          .csp-toggle button { padding: .35rem .7rem; cursor: pointer; }
          .csp-current { color: #666; }
        `}</style>
      </head>
      <body>
        <header>
          <h1>CSP Nonce Demo</h1>
          <CspToggle current={mode} />
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}