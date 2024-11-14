import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/login';
//import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProyect from './pages/empleador/createProject';
import ListProjects from './pages/empleador/listProjects';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/employer/create-project" element={<CreateProyect/>} />
          <Route path="/employer/my-projects" element={<ListProjects/>} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
