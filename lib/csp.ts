// Helpers for building Content Security Policy

// three states our toggle can be in 
export type CspMode = 'off' | 'report' | 'enforce'

// cookie name we use to remember toggle state across requests
export const CSP_COOKIE = 'csp-mode'

// unknown cookie value defaults to 'off'
export function parseCspMode(value: string | undefined): CspMode {
    if (value === 'report' || value === 'enforce') return value 
    return 'off'
} 

// build CSP string for given nonce 
export function buildCsp(nonce: string, { isDev }: { isDev: boolean}): string {
    const scriptSrc = isDev 
        ? `'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval'`
        : `'self' 'nonce-${nonce}' 'strict-dynamic'`

    const styleSrc = isDev
        ? `'self' 'unsafe-inline'`
        : `'self' 'nonce-${nonce}'`    

    const directives = [
        `default-src 'self'`,
        `script-src ${scriptSrc}`,
        `style-src ${styleSrc}`,
        `img-src 'self' data:`,
        `font-src 'self'`,
        `connect-src 'self'`,
        `object-src 'none'`,
        `base-uri 'self'`,
        `form-action 'self'`,
        `frame-ancestors 'none'`,        
    ]

    return directives.join('; ')
}


