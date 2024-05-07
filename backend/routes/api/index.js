const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { ProjectManager } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await ProjectManager.findOne({
    where: {
      username: 'Demo-Lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.projectmanager);
    }
);

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.projectmanager);
  }
);


module.exports = router;