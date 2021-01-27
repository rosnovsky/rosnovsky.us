import auth from '../../../utils/auth'

export default async function callback(req: any, res: any) {
  try {
    await auth.handleCallback(req, res, {})
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
