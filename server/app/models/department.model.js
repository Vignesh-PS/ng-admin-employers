const fs = require("fs");
const fileConfig = require("../config/file-config");

//const departmentFile = fileConfig.EMPLOYER_FILE;
const departmentFile = fileConfig.DEPT_FILE;

// constructor
const Department = function (department) {
  this.id = department.id || "";
  this.department_name = department.department_name;
  this.department_description = department.department_description;
};

Department.create = (newDepartment, result) => {
  try {
    let rawdata = fs.readFileSync(departmentFile);
    let departmentData = JSON.parse(rawdata);
    let newDeptId = (departmentData[departmentData.length-1].id + 1);
    newDepartment.id = newDeptId;
    departmentData.push(newDepartment);

    fs.writeFileSync(departmentFile, JSON.stringify(departmentData));
    result(null, {
      status: "200",
      data: departmentData,
      error: "Department added successfully.",
    });
  } catch {
    result(null, { status: "400", error: "Data not found" });
  }
};

Department.findById = (departmentId, result) => {
  try{
    let rawdata = fs.readFileSync(departmentFile);
    let departmentData = JSON.parse(rawdata);
    let department = departmentData.filter(x => x.id == departmentId)[0];
    if(department){
      result(null, { status: "200", data: department });
    }else{
      result(null, { status: "400", error: "Data not found" });
    }
  }
  catch {
    result(null, { status: "400", error: "Data not found" });
  }

};

Department.getAll = (result) => {
  try {
    let rawdata = fs.readFileSync(departmentFile);
    let department = JSON.parse(rawdata);
    result(null, { status: "200", data: department });
  } catch {
    result(null, { status: "400", error: "Data not found" });
  }
};

Department.updateById = (id, department, result) => {
  try {
    let rawdata = fs.readFileSync(departmentFile);
    let departmentData = JSON.parse(rawdata);

    let deptIndex = departmentData.findIndex(x => x.id == id);
    if(deptIndex != -1){
      departmentData[deptIndex] = department;
    }
    fs.writeFileSync(departmentFile, JSON.stringify(departmentData));
    result(null, { status: "200", data: id, error: 'Department updated successfully.' });
  } catch {
    result(null, { status: "400", error: "Data not found" });
  }
};

Department.remove = (id, result) => {
  try {
    let rawdata = fs.readFileSync(departmentFile);
    let departmentData = JSON.parse(rawdata);
    let departmentIndex = departmentData.findIndex(x => x.id == id);
    if(departmentIndex != -1){
      departmentData.splice(departmentIndex, 1);
      fs.writeFileSync(departmentFile, JSON.stringify(departmentData));
    result(null, { status: "200", error: 'Department deleted successfully', id : departmentIndex });
    }else{
    result(null, { status: "400", error: "Department can not be deleted." });
    }
  } catch {
    result(null, { status: "400", error: "Department can not be deleted." });
  }
};

module.exports = Department;
