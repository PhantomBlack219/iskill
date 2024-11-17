import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/login';
import CreateProyect from './pages/employer/createProject';
import ListProjects from './pages/employer/listProjects';
import ListVacancies from './pages/employer/listVacancies';
import CreateVacant from './pages/employer/createVacant';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/employer/create-project" element={<CreateProyect/>} />
          <Route path="/employer/my-projects" element={<ListProjects/>} />
          <Route path="/employer/create-vacant" element={<CreateVacant/>} />
          <Route path="/employer/my-vacancies" element={<ListVacancies/>} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
