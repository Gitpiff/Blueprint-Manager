const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { ProjectManager } = require('../../db/models');

const router = express.Router();

// Sign up
router.post(
    '/',
    async (req, res) => {
      const { firstName, lastName, username, email, password, companyName, industrySector } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const projectmanager = await ProjectManager.create({ firstName, lastName, username, email, companyName, industrySector, hashedPassword });
  
      const safeUser = {
        id: projectmanager.id,
        firstName: projectmanager.firstName,
        lastName: projectmanager.lastName,
        username: projectmanager.username,
        email: projectmanager.email,
        companyName: projectmanager.companyName,
        industrySector: projectmanager.industrySector
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );


module.exports = router;