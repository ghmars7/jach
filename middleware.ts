import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

const adminOnlyPaths = [
  '/dashboard/classes',
  '/dashboard/subjects',
  '/dashboard/settings',
];

export async function middleware(request: NextRequest) {
  // Liste des chemins publics
  const publicPaths = ['/', '/auth/register'];
  
  // Vérifier si le chemin est public
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Vérifier l'authentification pour les autres chemins
  const token = request.cookies.get('token')?.value || '';  

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const decoded = await verifyAuth(request);
    if (!decoded) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Vérifier les permissions pour les chemins réservés aux admins
    if (adminOnlyPaths.some(path => request.nextUrl.pathname.startsWith(path)) && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};