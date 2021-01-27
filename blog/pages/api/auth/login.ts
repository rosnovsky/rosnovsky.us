import auth from '../../../utils/auth'
// import { NowRequest, NowResponse } from '@vercel/node'

export default async function login(req: any, res: any) {
  try {
    await auth.handleLogin(req, res, {})
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
