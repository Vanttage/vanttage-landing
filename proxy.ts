import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/* Protege todo /portal/* (excepto el login). Sin sesión → redirige al login. */
export async function proxy(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // ── Modo interino: clave simple (HTTP Basic) mientras no haya Supabase ──
  if (!url || !key) {
    const pass = process.env.PORTAL_PASS;
    if (pass) {
      const user = process.env.PORTAL_USER || "vanttage";
      const expected = "Basic " + btoa(`${user}:${pass}`);
      if (req.headers.get("authorization") !== expected) {
        return new NextResponse("Autenticación requerida", {
          status: 401,
          headers: { "WWW-Authenticate": 'Basic realm="Portal Vanttage"' },
        });
      }
    }
    // Sin Supabase ni clave: no bloquea (evita romper el sitio en config)
    return NextResponse.next();
  }

  let res = NextResponse.next({ request: req });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        cookiesToSet.forEach(({ name, value, options }) =>
          res.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = req.nextUrl.pathname;
  const isLogin = path === "/portal/login";

  // Sin sesión y fuera del login → al login
  if (!user && !isLogin) {
    const to = req.nextUrl.clone();
    to.pathname = "/portal/login";
    return NextResponse.redirect(to);
  }

  // Con sesión y en el login → al panel
  if (user && isLogin) {
    const to = req.nextUrl.clone();
    to.pathname = "/portal/panel";
    return NextResponse.redirect(to);
  }

  return res;
}

export const config = {
  matcher: ["/portal/:path*", "/api/portal/:path*"],
};
