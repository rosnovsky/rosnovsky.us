import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, { returnTo: req.query.returnTo as string });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },
});