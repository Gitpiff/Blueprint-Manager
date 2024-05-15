const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { ProjectManager } = require('../../db/models');
const router = express.Router();

// Validation middleware for creating and updating Project Manager
const validateProjectManager = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('First Name must have between 2 and 30 characters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Last Name must have between 2 and 30 characters'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required')
    .isLength({ min: 2, max: 15 })
    .withMessage('Username must have between 2 and 15 characters'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email')
    .isLength({ min: 2, max: 30 })
    .withMessage('Email must have between 2 and 30 characters'),
  check('companyName')
    .exists({ checkFalsy: true })
    .withMessage('Company Name is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Company Name must have between 2 and 30 characters'),
  check('industrySector')
    .exists({ checkFalsy: true })
    .withMessage('Industry Sector is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Industry Sector must have between 2 and 30 characters'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Password must have between 2 and 30 characters'),
  handleValidationErrors
];

const validateEditProjectManager = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('First Name must have between 2 and 30 characters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Last Name must have between 2 and 30 characters'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required')
    .isLength({ min: 2, max: 15 })
    .withMessage('Username must have between 2 and 15 characters'),
  check('companyName')
    .exists({ checkFalsy: true })
    .withMessage('Company Name is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Company Name must have between 2 and 30 characters'),
  check('industrySector')
    .exists({ checkFalsy: true })
    .withMessage('Industry Sector is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Industry Sector must have between 2 and 30 characters'),
  handleValidationErrors
];

// Get the current ProjectManager
router.get('/current', restoreUser, requireAuth, (req, res) => {
  const { projectManager } = req;
  if (projectManager) {
    const safeUser = {
      id: projectManager.id,
      email: projectManager.email,
      username: projectManager.username,
      firstName: projectManager.firstName,
      lastName: projectManager.lastName,
      companyName: projectManager.companyName,
      industrySector: projectManager.industrySector,
    };
    return res.json({ projectManager: safeUser });
  } else {
    return res.status(404).json({ message: 'ProjectManager not found' });
  }
});

// Create a new ProjectManager
router.post('/', validateProjectManager, async (req, res, next) => {
  const { firstName, lastName, username, email, companyName, industrySector, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newProjectManager = await ProjectManager.create({
      firstName,
      lastName,
      username,
      email,
      companyName,
      industrySector,
      hashedPassword,
    });

    res.status(201).json(newProjectManager);
  } catch (error) {
    next(error);
  }
});

// Get all ProjectManagers
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const projectManagers = await ProjectManager.findAll();
    res.status(200).json(projectManagers);
  } catch (error) {
    next(error);
  }
});

// Get a ProjectManager by ID
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const projectManager = await ProjectManager.findByPk(req.params.id);
    if (projectManager) {
      res.status(200).json(projectManager);
    } else {
      res.status(404).json({ message: 'ProjectManager not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Update a ProjectManager
router.put('/:id', requireAuth, validateEditProjectManager, async (req, res, next) => {
  const { firstName, lastName, username, companyName, industrySector } = req.body;

  try {
    const projectManager = await ProjectManager.findByPk(req.params.id);
    if (projectManager) {

      await projectManager.update({
        firstName,
        lastName,
        username,
        companyName,
        industrySector
      });

      res.status(200).json(projectManager);
    } else {
      res.status(404).json({ message: 'ProjectManager not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a ProjectManager
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const projectManager = await ProjectManager.findByPk(req.params.id);
    if (projectManager) {
      await projectManager.destroy();
      res.status(200).json({ message: "Project Manager Successfully Deleted" });
    } else {
      res.status(404).json({ message: 'Project Manager not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;