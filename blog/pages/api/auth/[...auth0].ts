import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'

export default handleAuth({
  async login(req, res) {
    // const atob = (str: string) => {
    //   return Buffer.from(str, 'base64').toString('binary')
    // }
    const returnTo = req.query.returnTo.toString()
    try {
      await handleLogin(req, res, {
        returnTo,
      })
    } catch (error) {
      res.status(error.status || 400).end(error.message)
    }
  },
})
