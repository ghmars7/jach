import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Définition de l'interface pour le payload décodé du JWT
interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
  role: 'admin' | 'teacher'; // Adaptez les rôles à vos besoins
  iat: number;
  exp: number;
}

const JWT_SECRET =
  process.env.JWT_SECRET || '45820f08a0329cd43151e6990cf4ad917a9e04ed6abba1b49802e7d9893b828605aab07669ee90ab1eb6f0c5aaa8990cd6f89389d0d43771e2f12e9c64906186';

export function generateToken(user: any) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export async function verifyAuth(request: NextRequest): Promise<DecodedToken | null> {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const decoded = payload as DecodedToken;

    if (
      typeof decoded.id === 'string' &&
      typeof decoded.email === 'string' &&
      typeof decoded.role === 'string' &&
      decoded.role in { admin: true, teacher: true } // Vérifie si le rôle est valide
    ) {
      return decoded;
    }
    return null
  } catch (error) {
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<DecodedToken> {
  const user = await verifyAuth(request);

  if (!user) {
    throw NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }

  return user;
}

export async function requireAdmin(request: NextRequest): Promise<DecodedToken> {
  const user = await requireAuth(request);

  // Vérifiez si l'utilisateur est un DecodedToken et son rôle
  if (user.role !== 'admin') {
    throw NextResponse.json(
      { error: 'Accès refusé' },
      { status: 403 }
    );
  }

  return user;
}
