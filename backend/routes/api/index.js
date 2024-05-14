const router = require('express').Router();
const sessionRouter = require('./session.js');
const pmsRouter = require('./projectmanagers.js');
const projectRouter = require('./projects.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.projectmanager to the user in the database
  // If current user session is not valid, set req.projectmanager to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/projectmanagers', pmsRouter);

router.use('/projects', projectRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;


