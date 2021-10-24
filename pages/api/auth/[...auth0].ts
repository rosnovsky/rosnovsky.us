import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { trackGoal } from 'fathom-client'

export default handleAuth({
  async login(req, res) {
    try {
        trackGoal('UIIDM49K', 0)
        await handleLogin(req, res, { returnTo: `${req.headers.referer}` });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});

