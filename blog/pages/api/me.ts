import auth from '../../utils/auth'

export default async function me(req: any, res: any) {
  //   } catch (error) {
  //     console.error(error)
  //     res.status(error.status || 500).end(error.message)
  //     return
  //   }
  // }
  if (typeof window === 'undefined') {
    const session = await auth.getSession(req)
    if (!session || !session.user) {
      res.writeHead(302, {
        Location: '/api/login',
      })
      res.end()
      return
    }
    return { user: session.user }
  }
  const session = await auth.getSession(req)
  if (!session || !session.user) {
    await auth.handleLogin(req, res, {})
  }
}
