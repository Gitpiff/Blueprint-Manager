const express = require('express');
const { check } = require('express-validator');
const { Staff } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validation middlewares
const validateStaff = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First name is required.')
        .isLength({ min: 1, max: 50 })
        .withMessage('First name must not be more than 50 characters long.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last name is required.')
        .isLength({ min: 1, max: 50 })
        .withMessage('Last name must not be more than 50 characters long.'),
    check('picture')
        .exists({ checkFalsy: true })
        .withMessage('Picture URL is required.')
        .isURL()
        .withMessage('Picture must be a valid URL.'),
    check('hireDate')
        .exists({ checkFalsy: true })
        .withMessage('Hire date is required.')
        .isISO8601()
        .withMessage('Hire date must be a valid date.'),
    check('role')               
        .exists({ checkFalsy: true })
        .withMessage('Role is required.')
        .isLength({ min: 1, max: 50 })
        .withMessage('Role must not be more than 50 characters long.'),
    check('salary')
        .exists({ checkFalsy: true })
        .withMessage('Salary is required.')
        .isInt({ min: 0 })
        .withMessage('Salary must be a valid integer and not negative.'),
    handleValidationErrors
];

// GET all Employees
router.get('/', async (req, res, next) => {
    try {
        const staff = await Staff.findAll();
        res.json(staff);
    } catch (error) {
        next(error);
    }
});

// GET Employee by ID
router.get('/:id', async (req, res, next) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (staff) {
            res.json(staff);
        } else {
            res.status(404).json({ message: 'Staff not found' });
        }
    } catch (error) {
        next(error);
    } 
});

// POST create new Employee
router.post('/new', validateStaff, async (req, res, next) => {
    try {
        const { firstName, lastName, picture, hireDate, role, salary } = req.body;
        const newEmployee = await Staff.create({ firstName, lastName, picture, hireDate, role, salary });
        res.status(201).json(newEmployee);
    } catch (error) {
        error.message = "Bad Request"
        error.status = 400
        next(error)
    }
});

// PUT update Employee
router.put('/:id', validateStaff, async (req, res, next) => {
    try {
        const { firstName, lastName, picture, hireDate, role, salary } = req.body;
        const employee = await Staff.findByPk(req.params.id);

        if (employee) {
            employee.firstName = firstName;
            employee.lastName = lastName;
            employee.picture = picture;
            employee.hireDate = hireDate;
            employee.role = role;
            employee.salary = salary;

            await employee.save();
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        next(error);
    }
});

// DELETE Employee
router.delete('/:id', async (req, res, next) => {
    try {
        const employee = await Staff.findByPk(req.params.id);
        if (employee) {
            await employee.destroy();
            res.status(200).json({ message: "Employee Successfully Removed from Project" });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
