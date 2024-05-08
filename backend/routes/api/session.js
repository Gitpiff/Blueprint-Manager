const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { ProjectManager } = require('../../db/models');
const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,
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