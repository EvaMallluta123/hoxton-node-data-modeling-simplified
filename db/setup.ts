import Database from "better-sqlite3";

const db = Database(`./db/data.db`, { verbose: console.log });

const applicants = [
  {
    name: "John",
    gender: "Male",
    birthday: "23/08/2000",
    profession: "Dentist",
    experience: "2 years",
  },
  {
    name: "Ann",
    gender: "Female",
    birthday: "21/06/1998",
    profession: "Doctor",
    experience: "3 years",
  },
  {
    name: "Ben",
    gender: "Male",
    birthday: "09/12/1987",
    profession: "Student",
    experience: "5 years",
  },
  {
    name: "Beatric",
    gender: "Female",
    birthday: "04/01/1989",
    profession: "Businessman",
    experience: "6 years",
  },
  {
    name: "Albert",
    gender: "Male",
    birthday: "23/08/1979",
    profession: "Professor",
    experience: "10 years",
  },
  {
    name: "Ensa",
    gender: "Female",
    birthday: "22/11/1989",
    profession: "Librarian",
    experience: "6 years",
  },
  {
    name: "Eri",
    gender: "Male",
    birthday: "23/08/1988",
    profession: "Architect",
    experience: "10 years",
  },
  {
    name: "Emi",
    gender: "Female",
    birthday: "07/08/1996",
    profession: "",
    experience: "3 years",
  },
];
const interviewers = [
  {
    name: "Ema",
    education: "Doctor",
    work_position: "hospital director",
    companyId:1
  },
  {
    name: "Marsela",
    education: "Economist",
    work_position: "director of the finance department",
    companyId:5
  },
  {
    name: "Rigers",
    education: "Mechanic",
    work_position: "local owner",
    companyId:4
  },
  {
    name: "Donald",
    education: "Engineer",
    work_position: "director of the IT department",
    companyId:3
  },
  {
    name: "Erni",
    education: "Farmer",
    work_position: "farm owner",
    companyId:2
  },
];

const interviews = [
  {
    applicantId: "1",
    interviewerId: "1",
    date: "02/09/2022",
  },
  {
    applicantId: "1",
    interviewerId: "2",
    date: "02/09/2022",
  },
  {
    applicantId: "2",
    interviewerId: "1",
    date: "02/09/2022",
  },
  {
    applicantId: "2",
    interviewerId: "2",
    date: "02/09/2022",
  },
  {
    applicantId: "3",
    interviewerId: "1",
    date: "02/09/2022",
  },
  {
    applicantId: "3",
    interviewerId: "3",
    date: "02/09/2022",
  },
  {
    applicantId: "3",
    interviewerId: "4",
    date: "02/09/2022",
  },

  {
    applicantId: "6",
    interviewerId: "4",
    date: "02/09/2022",
  },
  {
    applicantId: "8",
    interviewerId: "5",
    date: "02/09/2022",
  },
  {
    applicantId: "7",
    interviewerId: "5",
    date: "02/09/2022",
  },
  {
    applicantId: "3",
    interviewerId: "5",
    date: "02/09/2022",
  },
  {
    applicantId: "8",
    interviewerId: "2",
    date: "02/09/2022",
  },
];
const companys = [
  {
    name: "Apple",
    city: "United States",
  },
  {
    name: "Saudi Aramco",
    city: "Saudi Arabia",
  },
  {
    name: "Microsoft",
    city: "United States",
  },
  {
    name: "Amazon",
    city: "United States",
  },
  {
    name: "Alphabet",
    city: "United States",
  },
  {
    name: "Facebook",
    city: "United States",
  },
  {
    name: "Tencent",
    city: "China",
  },
  {
    name: "Tesla",
    city: "United States",
  },
  {
    name: "Alibaba",
    city: "China",
  },
];
const employees = [
  {
    name: "Ann",
    email: "ann@gmail.com",
    position: "shef",
    companyId: 1
  },
  {
    name: "Luka",
    email: "luka@gmail.com",
    position: "programmer",
    companyId: 3
  },
  {
    name: "Boss",
    email: "boss@gmail.com",
    position: "economist",
    companyId: 4
  },
  {
    name: "Erison",
    email: "erison@gmail.com",
    position: "electronic",
    companyId: 2
  },
  {
    name: "Shen",
    email: "shen@gmail.com",
    position: "courier",
    companyId: 5
  },
  {
    name: "Niko",
    email: "niko@gmail.com",
    position: "lawyer",
    companyId: 6
  },
];

//Applicants
const dropApplicantsTable = db.prepare(`
DROP TABLE IF EXISTS applicants;
`);
dropApplicantsTable.run();

const createApplicantsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS applicants(
    id INTEGER,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    birthday TEXT,
    profession TEXT NOT NULL,
    experience TEXT NOT NULL,
    PRIMARY KEY(id)
);  `);
createApplicantsTable.run();

const createApplicants = db.prepare(`
INSERT INTO applicants(name, gender,birthday, profession, experience) 
VALUES (@name, @gender,@birthday, @profession, @experience);

`);
for (let applicant of applicants) {
  createApplicants.run(applicant);
}

//Interviewers
const dropInterviewersTable = db.prepare(`
 DROP TABLE IF EXISTS interviewers;
 `);
dropInterviewersTable.run();

const createInterviewersTable = db.prepare(`
CREATE TABLE IF NOT EXISTS interviewers(
    id INTEGER,
   name TEXT NOT NULL,
   education TEXT NOT NULL,
   work_position TEXT NOT NULL,
   PRIMARY KEY(id) ); `);
createInterviewersTable.run();

const createInterviewers = db.prepare(`
 INSERT INTO interviewers(name,education,work_position) 
VALUES (@name,@education,@work_position);

 `);
for (let interviewer of interviewers) {
  createInterviewers.run(interviewer);
}
// interviews
const dropInterviewsTable = db.prepare(`
 DROP TABLE IF EXISTS interviews;
 `);
dropInterviewsTable.run();
const createInterviewsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS interviews (
  id INTEGER,
  applicantId INTEGER,
  interviewerId INTEGER,
  date TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (applicantId) REFERENCES applicants(id) ON DELETE CASCADE,
  FOREIGN KEY (interviewerId) REFERENCES interviewers(id) ON DELETE CASCADE
);
`);
createInterviewsTable.run();

const createInter = db.prepare(`
INSERT INTO interviews(applicantId,interviewerId,date) 
VALUES (@applicantId, @interviewerId, @date);

`);
for (let interview of interviews) {
  createInter.run(interview);
}
// company
const dropCompanyTable = db.prepare(`
 DROP TABLE IF EXISTS companys;
 `);
 dropCompanyTable.run();
const createCompanysTable = db.prepare(`
CREATE TABLE IF NOT EXISTS companys(
    id INTEGER,
    name TEXT NOT NULL,
    city TEXT,
    PRIMARY KEY(id)
);  `);
createCompanysTable.run();


const createCompanys = db.prepare(`
INSERT INTO companys(name,city) 
VALUES (@name, @city);

`);
for (let company of companys) {
    createCompanys.run(company);
}
// employees
const dropEmployeesTable = db.prepare(`
 DROP TABLE IF EXISTS employees ;
 `);
 dropEmployeesTable.run();
const createEmployeesTable = db.prepare(`
CREATE TABLE IF NOT EXISTS employees(
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT,
    position TEXT,
    companyId INTEGER,
    FOREIGN KEY (companyId) REFERENCES companys(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
);  `);
createEmployeesTable.run();


const createEmployees= db.prepare(`
INSERT INTO employees(name,email,position, companyId) 
VALUES (@name, @email, @position, @companyId);

`);
for (let employee of employees) {
    createEmployees.run(employee);
}