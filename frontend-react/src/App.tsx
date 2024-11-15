import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/login';
import CreateProyect from './pages/employer/createProject';
import ListProjects from './pages/employer/listProjects';

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
