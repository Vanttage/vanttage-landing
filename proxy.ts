import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/* Protege todo /portal/* (excepto el login). Sin sesión → redirige al login. */
export async function proxy(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si Supabase aún no está configurado, no bloqueamos (evita romper el sitio)
  if (!url || !key) return NextResponse.next();

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
  matcher: ["/portal/:path*"],
};
