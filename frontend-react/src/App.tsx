import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/login';
import CreateProyect from './pages/employer/createProject';
import ListProjects from './pages/employer/listProjects';
import ListVacancies from './pages/employer/listVacancies';
import CreateVacant from './pages/employer/createVacant';
import ListApplicationsV from './pages/employer/listApplications';
import Register from './pages/auth/register';
import ListProjectsAdmin from './pages/admin/listProjectsAdmin';
import ListVacanciesAdmin from './pages/admin/listVacanciesAdmin';
import ListUsersAdmin from './pages/admin/listUsersAdmin';
import CreateUserAdmin from './pages/admin/createUserAdmin';
import ListVacanciesEmployee from './pages/employee/listVacanciesAvailable';
import ListProjectsEmployee from './pages/employee/listVacancies';
import ListApplications from './pages/employee/listApplications';



function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="employer">
            <Route path="my-projects" element={<ListProjects/>} />
            <Route path="create-project" element={<CreateProyect/>} />
            <Route path="my-vacancies" element={<ListVacancies/>} />
            <Route path="create-vacant" element={<CreateVacant/>} />
            <Route path="applications/:vacanteId" element={<ListApplicationsV />} />
          </Route>
          <Route path="admin">
            <Route path="all-projects" element={<ListProjectsAdmin/>} />
            <Route path="create-project" element={<CreateProyect/>} />
            <Route path="all-vacancies" element={<ListVacanciesAdmin/>} />
            <Route path="create-vacant" element={<CreateVacant/>} />
            <Route path="all-users" element={<ListUsersAdmin/>} />
            <Route path='create-user' element={<CreateUserAdmin/>}/>
          </Route>
          <Route path="employee">
            <Route path="all-vacancies" element={<ListVacanciesEmployee/>} />
            <Route path="my-projects" element={<ListProjectsEmployee/>} />
            <Route path="my-applications" element={<ListApplications/>} />
  
          </Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
