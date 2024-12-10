import { NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {

  // Liste des chemins publics
  const publicPaths = ['/', '/auth/register'];
  let token = '';  
  // Vérifier si le chemin est public
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  // Vérifier l'authentification pour les autres chemins
  if (!token) {
    token = request.cookies.get('token')?.value || '';
  }
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  try {
    const decoded = await verifyAuth(request);
    if (!decoded) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};