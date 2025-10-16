const Department = require('../models/department');

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const dept = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ msg: 'Department not found' });
    res.json(department);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update department
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!department) return res.status(404).json({ msg: 'Department not found' });
    res.json(department);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ msg: 'Department not found' });
    res.json({ msg: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
