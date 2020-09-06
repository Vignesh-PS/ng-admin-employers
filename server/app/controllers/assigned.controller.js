const Assigned = require("../models/assigned.model.js");

// Create and Save a new Assigned
exports.create = (req, res) => {
   // Validate request
   if (!req.body.employer_id) {
    res.status(400).send({
      status: '400',
      error: "Content can not be empty!"
    });
  }

  // Create a Assigned
  const assigned = new Assigned({
      employer_id: req.body.employer_id,
      dept_id: req.body.dept_id,
      assigned_start_date: req.body.assigned_start_date,
      assigned_end_date: req.body.assigned_end_date,
  });

  // Save Assigned in the database
  Assigned.create(assigned, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Assigned."
      });
    else res.send(data);
  });
};

// Retrieve all Assigneds from the database.
exports.findAll = (req, res) => {
    Assigned.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving assigneds."
          });
        else res.send(data);
      });
};

// Find a single Assigned with a assignedId
exports.findOne = (req, res) => {
    Assigned.findById(req.params.deptId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Assigned with id ${req.params.assignedId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Assigned with id " + req.params.assignedId
            });
          }
        } else res.send(data);
      });
};

// Update a Assigned identified by the assignedId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Assigned.updateById(
    req.params.deptId,
    new Assigned(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Assigned with id ${req.params.assignedId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Assigned with id " + req.params.assignedId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Assigned with the specified assignedId in the request
exports.delete = (req, res) => {
    Assigned.remove(req.params.deptId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Assigned with id ${req.params.assignedId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Assigned with id " + req.params.assignedId
            });
          }
        } else res.send(data);
      });
};

// Delete all Assigneds from the database.
exports.deleteAll = (req, res) => {
    Assigned.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all assigneds."
          });
        else res.send({ message: `All Assigneds were deleted successfully!` });
      });
};