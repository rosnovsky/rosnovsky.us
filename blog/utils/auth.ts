import { initAuth0 } from '@auth0/nextjs-auth0'

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET,
  scope:
    'openid profile read:comments post:comments update:comments delete:comments',
  redirectUri: process.env.REDIRECT_URI || 'https://rosnovsky.us/api/callback',
  postLogoutRedirectUri: process.env.LOGOUT_URI || 'https://rosnovsky.us',
  audience: '/blog/',
  session: {
    cookieSecret: process.env.COOKIE_SECRET!,
    cookieLifetime: 60 * 60 * 8,
    storeIdToken: true,
    storeAccessToken: true,
    storeRefreshToken: true,
  },
  oidcClient: {
    httpTimeout: 2500,
    clockTolerance: 10000,
  },
})
