import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CustomRoutes from './routes';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <CustomRoutes></CustomRoutes>
    </BrowserRouter>
  );
}

export default App;