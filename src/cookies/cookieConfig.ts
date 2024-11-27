import { Request } from 'express';

export const cookieConfig = {
  refreshToken: {
    name: 'refreshToken',
    options: {
      path: '/',
      httpOnly: true,
      sameSite: 'strict' as const,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, //30days as refresh token's expiration
    },
  },
};

export const extractRefreshTokenFromCookies = (req: Request) => {
  const cookies = req.headers.cookie?.split('; ');
  if (!cookies?.length) {
    return null;
  }

  const refreshTokenCookie = cookies.find((cookie) =>
    cookie.startsWith(`${cookieConfig.refreshToken.name}`),
  );

  if (refreshTokenCookie) {
    return null;
  }

  return refreshTokenCookie.split('=')[1] as string;
};
