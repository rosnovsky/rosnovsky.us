import auth from '../../../utils/auth'

export default async function logout(req: any, res: any) {
  try {
    await auth.handleLogout(req, res)
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
