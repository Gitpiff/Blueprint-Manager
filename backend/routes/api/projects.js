const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Project } = require('../../db/models');


const router = express.Router();

const validateProject = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min:4 })
        .withMessage('Project Name must be less than 50 characters'),
    check('clientName')
        .exists({ checkFalsy: true })
        .withMessage('Client Id is required'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 30, max: 2000 })
        .withMessage('Project Description must have between 30 and 2000 characters'),
    check('budget')
        .exists({ checkFalsy: true })
        .isInt({ min: 500 })
        .withMessage('Budget must be an integer greater than 500'),
    check('projectManagerId')
        .exists({ checkFalsy: true })
        .withMessage('Project Manager Id is required'),
    check('commencementDate')
        .exists({ checkFalsy: true })
        .withMessage('Start Date is required'),
    check('completionDate')
        .exists({ checkFalsy: true })
        .withMessage('Completion Date is required'),
    handleValidationErrors
];

// Get All Projects
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

// Get a Project By Id
router.get('/:projectId', requireAuth, async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.projectId);
        console.log(`params ${project}`)
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (error) {
        next(error);
    }
});

// Update Project 
router.put('/:projectId', requireAuth, async (req, res, next) => {
    const { projectManager } = req;
    try {
        const { name, clientName, description, budget, commencementDate, completionDate, coverImage, projectManagerId } = req.body;
        const project = await Project.findByPk(req.params.projectId);

        if (project) {
            if (project.projectManagerId !== projectManager.id) {
                return res.status(403).json({ message: "Unauthorized to update this project" });
            }
            projectManager.id = projectManagerId;
            project.name = name;
            project.clientName = clientName;
            project.description = description;
            project.budget = budget;
            project.commencementDate = commencementDate;
            project.completionDate = completionDate;
            project.coverImage = coverImage

            await project.save();

            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (error) {
        next({
            message: "Bad Request",
            status: 400,
            stack: error.stack
        });
    }
});

// Delete Project
router.delete('/:projectId', requireAuth, async (req, res, next) => {
    const { projectManager } = req;
    try {
        const project = await Project.findByPk(req.params.projectId);

        if (project) {
            if (project.projectManagerId !== projectManager.id) {
                return res.status(403).json({ message: "Unauthorized to delete this project" });
            }

            await project.destroy();
            res.status(200).json({ message: "Project Successfully Deleted" });
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (error) {
        next(error);
    }
});

// Post New Project
router.post('/new', requireAuth, async (req, res, next) => {
    const { projectManager } = req;
    try {
        const { name, clientName, description, budget, coverImage, commencementDate, completionDate } = req.body;

        if (projectManager) {
            const newProject = await Project.create ({
                name,
                clientName,
                description,
                budget,
                coverImage,
                projectManagerId: projectManager.id,
                commencementDate,
                completionDate
            })

            res.status(201).json(newProject);
        } else {
            res.status(403).json({ message: "Unauthorized" }); 
        }

    } catch(error) {
        error.message = "Bad Request"
        error.status = 400
        next(error)
    }

})

// Get All Projects of Current PM
router.get('/current', requireAuth, async (req, res, next) => {
    const { projectManager } = req;

    if(!projectManager) {
        return res.status(401).json({
            message: 'Authentication Required'
        })
    };

    const projects = await Project.findAll({
       include: [
            {
                model: Project
            }
       ],
       where: {
        projectManagerId: projectManager.id
       }
    })
    res.status(200).json(projects);

    if (!projects) {
        return res.status(404).json({
            message: 'Projects could not be found'
        })
    };

})

// Get Projects by Project Manager ID
router.get('/:projectManagerId', requireAuth, async (req, res, next) => {
    try {
        const { projectManagerId } = req.params;

        const projects = await Project.findAll({
            where: {
                projectManagerId
            }
        });

        if (projects.length > 0) {
            res.status(200).json(projects);
        } else {
            res.status(404).json({
                message: 'Projects could not be found'
            });
        }
    } catch (error) {
        next(error);
    }
});








module.exports = router;

