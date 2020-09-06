const Employer = require("../models/employer.model.js");

// Create and Save a new Employer
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Employer
  const employer = new Employer({
      user_name: req.body.user_name,
      user_age: req.body.user_age,
      user_state: req.body.user_state,
      user_city: req.body.user_city,
      user_country: req.body.user_country,
  });

  // Save Employer in the database
  Employer.create(employer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employer."
      });
    else res.send(data);
  });
};

// Retrieve all Employers from the database.
exports.findAll = (req, res) => {
    Employer.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving employers."
          });
        else res.send(data);
      });
};

// Find a single Employer with a employerId
exports.findOne = (req, res) => {
    Employer.findById(req.params.employerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Employer with id ${req.params.employerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Employer with id " + req.params.employerId
            });
          }
        } else res.send(data);
      });
};

// Update a Employer identified by the employerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Employer.updateById(
    req.params.employerId,
    new Employer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employer with id ${req.params.employerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Employer with id " + req.params.employerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Employer with the specified employerId in the request
exports.delete = (req, res) => {
    Employer.remove(req.params.employerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Employer with id ${req.params.employerId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Employer with id " + req.params.employerId
            });
          }
        } else res.send({status: '200', error: `Employer was deleted successfully!` });
      });
};

// Delete all Employers from the database.
exports.deleteAll = (req, res) => {
    Employer.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all employers."
          });
        else res.send({ message: `All Employers were deleted successfully!` });
      });
};
