const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { ProjectManager } = require('../../db/models');
const router = express.Router();

// Log in
router.post(
    '/',
    async (req, res, next) => {
      const { credential, password } = req.body;
  
      const projectmanager = await ProjectManager.unscoped().findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
  
      if (!projectmanager || !bcrypt.compareSync(password, projectmanager.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
      }
  
      const safeUser = {
        id: projectmanager.id,
        email: projectmanager.email,
        username: projectmanager.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    (req, res) => {
      const { projectmanager } = req;
      if (projectmanager) {
        const safeUser = {
          id: projectmanager.id,
          email: projectmanager.email,
          username: projectmanager.username,
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );
  

module.exports = router;