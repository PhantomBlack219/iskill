import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
