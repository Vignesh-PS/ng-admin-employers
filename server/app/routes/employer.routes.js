module.exports = app => {
    const employer = require("../controllers/employer.controller.js");
    const department = require("../controllers/department.controller");
    const assigned = require("../controllers/assigned.controller");


    app.post("/employerAdd", employer.create);

    app.get("/getEmployers", employer.findAll);

    app.get("/getEmployer/:employerId", employer.findOne);

    app.post("/updateEmployer/:employerId", employer.update);

    app.post("/deleteEmployer/:employerId", employer.delete);


    app.post("/departmentAdd", department.create);

    app.get("/getDepartments", department.findAll);

    app.get("/getDepartment/:deptId", department.findOne);

    app.post("/updateDepartment/:deptId", department.update);

    app.post("/deleteDepartment/:deptId", department.delete);


    app.post("/assignedAdd", assigned.create);

    app.get("/getAssigneds", assigned.findAll);

    app.get("/getAssigned/:deptId", assigned.findOne);

    app.post("/updateAssigned/:deptId", assigned.update);

    app.post("/deleteAssigned/:deptId", assigned.delete);


  };
