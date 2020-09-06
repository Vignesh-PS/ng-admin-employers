const Department = require("../models/department.model.js");

// Create and Save a new Department
exports.create = (req, res) => {
   // Validate request
   if (!req.body.department_name) {
    res.status(400).send({
      status: '400',
      error: "Content can not be empty!"
    });
  }

  // Create a Department
  const department = new Department({
      department_name: req.body.department_name,
      department_description: req.body.department_description,
  });

  // Save Department in the database
  Department.create(department, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Department."
      });
    else res.send(data);
  });
};

// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
    Department.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving departments."
          });
        else res.send(data);
      });
};

// Find a single Department with a departmentId
exports.findOne = (req, res) => {
    Department.findById(req.params.deptId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Department with id ${req.params.departmentId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Department with id " + req.params.departmentId
            });
          }
        } else res.send(data);
      });
};

// Update a Department identified by the departmentId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Department.updateById(
    req.params.deptId,
    new Department(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Department with id ${req.params.departmentId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Department with id " + req.params.departmentId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Department with the specified departmentId in the request
exports.delete = (req, res) => {
    Department.remove(req.params.deptId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Department with id ${req.params.departmentId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Department with id " + req.params.departmentId
            });
          }
        } else res.send(data);
      });
};

// Delete all Departments from the database.
exports.deleteAll = (req, res) => {
    Department.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all departments."
          });
        else res.send({ message: `All Departments were deleted successfully!` });
      });
};