import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/login';
import CreateProyect from './pages/employer/createProject';
import ListProjects from './pages/employer/listProjects';
import ListVacancies from './pages/employer/listVacancies';
import CreateVacant from './pages/employer/createVacant';
import Register from './pages/auth/register';
import ListProjectsAdmin from './pages/admin/listProjects';

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
          </Route>
          <Route path="admin">
            <Route path="all-projects" element={<ListProjectsAdmin/>} />
            <Route path="create-project" element={<CreateProyect/>} />
            <Route path="all-vacancies" element={<ListVacancies/>} />
            <Route path="create-vacant" element={<CreateVacant/>} />
          </Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
