import auth from '../../utils/auth'

export default async function me(req: any, res: any) {
  try {
    const session = await auth.getSession(req)
    const tokenCache = auth.tokenCache(req, res)
    const { accessToken } = await tokenCache.getAccessToken({
      scopes: [
        'post:comments',
        'update:comments',
        'delete:comments',
        'read:comments',
      ],
    })
    await auth.handleProfile(req, res, {})
  } catch (error) {
    res.status(error.status || 500).end(error.message)
  }
  // if (typeof window === 'undefined') {
  //   const session = await auth.getSession(req)
  //   if (!session || !session.user) {
  //     res.writeHead(302, {
  //       Location: '/api/login',
  //     })
  //     res.end()
  //     return
  //   }
  //   return { user: session.user }
  // }
  // res.status(400)
}
