import { NextRequest, NextResponse } from "next/server";
import { buildCsp, parseCspMode, CSP_COOKIE } from "./lib/csp";

export function proxy(request: NextRequest) {
    // read toggle mode from cookie
    const mode = parseCspMode(request.cookies.get(CSP_COOKIE)?.value)

    // generate nonce 
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    const isDev = process.env.NODE_ENV === 'development'
    const csp = buildCsp(nonce, { isDev })

    // forward the nonce (and, when active, the CSP) to the render via REQUEST headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-nonce', nonce)
    if (mode !== 'off') {
        requestHeaders.set('Content-Security-Policy', csp)
    }

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    })

    // tell the browser what to do 
    if (mode === 'enforce') {
        // enforcing header - browser blocks violation
        response.headers.set('Content-Security-Policy', csp)
    } else if (mode === 'report') {
        // report-only header - browser reports but does not block 
        response.headers.set('Content-Security-Policy-Report-Only', csp)
    }
    // mode === 'off' -> no CSP header at all - browser enforces nothing

    return response
}

// Run on page routes; skip API, static assets, image optimizer, favicon, and Next.js prefetches 
export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch'},
            ],
        },
    ],
}
