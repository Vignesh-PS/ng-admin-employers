const fs = require("fs");
const fileConfig = require("../config/file-config");

const employerFile = fileConfig.EMPLOYER_FILE;
const deptFile = fileConfig.DEPT_FILE;
const assignedFile = fileConfig.ASSIGNED_FILE;

// constructor
const Employer = function (employer) {
  this.id = employer.id || "";
  this.user_name = employer.user_name;
  this.user_age = employer.user_age;
  this.user_state = employer.user_state;
  this.user_city = employer.user_city;
  this.user_country = employer.user_country;
};

Employer.create = (newEmployer, result) => {
  try {
    let rawdata = fs.readFileSync(employerFile);
    let employerData = JSON.parse(rawdata);
    let newEmployeeId = (+employerData[employerData.length-1].id +1);
    newEmployer.id = newEmployeeId;
    employerData.push(newEmployer);

    fs.writeFileSync(employerFile, JSON.stringify(employerData));
    result(null, {
      status: "200",
      data: employerData,
      error: "Employer added successfully.",
    });
  } catch {
    result(null, { status: "400", error: "Data not found" });
  }
};

Employer.findById = (employerId, result) => {
  try{
    let rawdata = fs.readFileSync(employerFile);
    let employerData = JSON.parse(rawdata);
    let employer = employerData.filter(x => x.id == employerId)[0];


    let dataAssign = calculateEmployeeAssignments(employerId);
    employer.assigned = dataAssign;
    result(null, { status: "200", data: employer });
  }
  catch(e) {
    result(null, { status: "400", error: "Data not found", err:e });
  }

};

function calculateEmployeeAssignments(id){
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
    let user = employerData.filter(x => x.id ==userid)[0];
    let dept = departmentData.filter(x => x.id == deptid)[0];
    let obj = { ...assign, ...user, ...dept};
    finalArray.push(obj);
  });

  return finalArray.filter(x => x.employer_id==id);
  //result(null, { status: "200", data: assignedData });
}

Employer.getAll = (result) => {
  try {
    let rawdata = fs.readFileSync(employerFile);
    let employer = JSON.parse(rawdata);
    result(null, { status: "200", data: employer });
  } catch {
    result(null, { status: "400", error: "Data not found" });
  }
};

Employer.updateById = (id, employer, result) => {
  try {
    let rawdata = fs.readFileSync(employerFile);
    let employerData = JSON.parse(rawdata);
    let employerIndex = employerData.findIndex(x => x.id == id);
    if(employerIndex != -1){
      employerData[employerIndex] = employer;
    }
    fs.writeFileSync(employerFile, JSON.stringify(employerData));
    result(null, { status: "200", data: employerData, error: 'Employer updated successfully' });
  } catch {
    result(null, { status: "400", error: "Data not found" });
  }
};

Employer.remove = (id, result) => {
  try {
    let rawdata = fs.readFileSync(employerFile);
    let employerData = JSON.parse(rawdata);
    let employerIndex = employerData.findIndex(x => x.id == id);
    if(employerIndex != -1){
      employerData.splice(employerIndex, 1);
      fs.writeFileSync(employerFile, JSON.stringify(employerData));
    result(null, { status: "200", error: 'Employer deleted successfully', id : employerIndex });
    }else{
    result(null, { status: "400", error: "Employer can not be deleted." });
    }
  } catch {
    result(null, { status: "400", error: "Employer can not be deleted." });
  }
};

module.exports = Employer;
