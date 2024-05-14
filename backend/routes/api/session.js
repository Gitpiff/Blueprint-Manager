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

    try {
      const projectManager = await ProjectManager.unscoped().findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      if (!projectManager || !bcrypt.compareSync(password, projectManager.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
      }

      const safeUser = {
        id: projectManager.id,
        email: projectManager.email,
        username: projectManager.username,
        firstName: projectManager.firstName,
        lastName: projectManager.lastName,
        companyName: projectManager.companyName,
        industrySector: projectManager.industrySector
      };

      await setTokenCookie(res, projectManager);

      return res.json({
        projectManager: safeUser
      });
    } catch (error) {
      next(error);
    }
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
  restoreUser,
  (req, res) => {
    const { projectManager } = req;
    if (projectManager) {
      const safeUser = {
        id: projectManager.id,
        email: projectManager.email,
        username: projectManager.username,
      };
      return res.json({
        projectManager: safeUser
      });
    } else {
      return res.json({ projectManager: null });
    }
  }
);

module.exports = router;