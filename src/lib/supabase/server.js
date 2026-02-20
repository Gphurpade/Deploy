import { createServerClient, serializeCookieHeader } from '@supabase/ssr'

export function createPagesServerClient(context) {
  const { req, res } = context;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          // req.cookies is available in Pages Router
          return Object.keys(req.cookies).map((name) => ({
            name,
            value: req.cookies[name],
          }))
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Use setHeader for the Pages Router
            res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options))
          })
        },
      },
    }
  )
}
