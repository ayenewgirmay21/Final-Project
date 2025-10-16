const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// CRUD routes
router.post('/', departmentController.createDepartment);       // Create
router.get('/', departmentController.getDepartments);         // Read all
router.get('/:id', departmentController.getDepartmentById);   // Read one
router.put('/:id', departmentController.updateDepartment);    // Update
router.delete('/:id', departmentController.deleteDepartment); // Delete

module.exports = router;
