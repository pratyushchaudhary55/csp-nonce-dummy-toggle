"use server"

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { parseCspMode, CSP_COOKIE, type CspMode } from "@/lib/csp";

/**
 * Persist the chosen CSP mode in a cookie. The NEXT request the browser makes
 * will carry this cookie, and our middleware will read it to decide which
 * (if any) CSP header to send.
 */
export async function setCspMode(mode: CspMode) {
    const safe = parseCspMode(mode) 
    const cookieStore = await cookies()
    cookieStore.set(CSP_COOKIE, safe, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax', 
    })
    // revalidate so the page re-renders under the new mode on navigation/refresh
    revalidatePath('/')
}