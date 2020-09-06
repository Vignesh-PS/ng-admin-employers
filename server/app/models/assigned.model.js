const fs = require("fs");
const fileConfig = require("../config/file-config");

//const assignedFile = fileConfig.EMPLOYER_FILE;
const assignedFile = fileConfig.ASSIGNED_FILE;
const employerFile = fileConfig.EMPLOYER_FILE;
const deptFile = fileConfig.DEPT_FILE;
// constructor
const Assigned = function (assigned) {
  this.id = assigned.id || "";
  this.employer_id = assigned.employer_id;
  this.dept_id = assigned.dept_id;
  this.assigned_start_date = assigned.assigned_start_date;
  this.assigned_end_date = assigned.assigned_end_date;
};

Assigned.create = (newAssigned, result) => {
  try {
    let rawdata = fs.readFileSync(assignedFile);
    let assignedData = JSON.parse(rawdata);
    let newDeptId = (+assignedData[assignedData.length - 1].id + 1);
    newAssigned.id = newDeptId;
    assignedData.push(newAssigned);

    fs.writeFileSync(assignedFile, JSON.stringify(assignedData));
    result(null, {
      status: "200",
      data: assignedData,
      error: "Assigned added successfully.",
    });
  } catch {
    result(null, { status: "400", error: "Data not found" });
  }
};

Assigned.findById = (assignedId, result) => {
  try {
    let assigned = mappingAssignedData(assignedId);
    if (assigned) {
      result(null, { status: "200", data: assigned });
    } else {
      result(null, { status: "400", error: "Data not found" });
    }
  } catch {
    result(null, { status: "400", error: "Data not found" });
  }
};

Assigned.getAll = (result) => {
  try {
    let data = mappingAssignedData();
    result(null, { status: "200", data: data });
  } catch {
    result(null, { status: "400", error: "Data not found" });
  }
};

function mappingAssignedData(id = "") {
  var rawdataEm = fs.readFileSync(employerFile);
  var employerData = JSON.parse(rawdataEm);

  var rawdataDept = fs.readFileSync(deptFile);
  var departmentData = JSON.parse(rawdataDept);

  var rawdata = fs.readFileSync(assignedFile);
  var assignedData = JSON.parse(rawdata);

  var finalArray = [];
  assignedData.forEach((assign) => {
    let userid = assign.employer_id;
    let deptid = assign.dept_id;
    let user = employerData.filter((x) => x.id == userid)[0];
    let dept = departmentData.filter((x) => x.id == deptid)[0];
    let obj = { ...assign, ...user, ...dept };
    finalArray.push(obj);
  });

  if (id != "") {
    return finalArray.filter((x) => x.id == id)[0];
  }

  return finalArray;
}

Assigned.updateById = (id, assigned, result) => {
  try {
    let rawdata = fs.readFileSync(assignedFile);
    let assignedData = JSON.parse(rawdata);
    result(null, { status: "200", data: assignedData });
  } catch {
    result(null, { status: "400", error: "Data not found" });
  }
};

Assigned.remove = (id, result) => {
  try {
    let rawdata = fs.readFileSync(assignedFile);
    let assignedData = JSON.parse(rawdata);
    let assignedIndex = assignedData.findIndex((x) => x.id == id);
    if (assignedIndex != -1) {
      assignedData.splice(assignedIndex, 1);
      fs.writeFileSync(assignedFile, JSON.stringify(assignedData));
      result(null, {
        status: "200",
        error: "Assigned deleted successfully",
        id: assignedIndex,
      });
    } else {
      result(null, { status: "400", error: "Assigned can not be deleted." });
    }
  } catch {
    result(null, { status: "400", error: "Assigned can not be deleted." });
  }
};

module.exports = Assigned;
