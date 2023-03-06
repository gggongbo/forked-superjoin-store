import type { NextApiRequest, NextApiResponse } from 'next';
import { setAuthCookies } from 'next-firebase-auth';

import { authService } from '@services/auth';

authService.initAuth();

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await setAuthCookies(req, res);
  } catch (error) {
    return res.status(500).json({ error: `Unexpected error: ${error}` });
  }
  return res.status(200).json({ success: true });
};

export default loginHandler;
