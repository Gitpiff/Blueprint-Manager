const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { ProjectManager } = require('../../db/models');

const router = express.Router();

const validateLogin = [
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('First Name must have at least two letters.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Last Name must have at least two letters.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Username must have at least four characters.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  check('companyName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please Provide a Valid Company Name'),
  check('industrySector')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please Provide a Valid Industry Sector.'),
  handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateLogin,
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
        projectManager: safeUser
      });
    }
  );


module.exports = router;