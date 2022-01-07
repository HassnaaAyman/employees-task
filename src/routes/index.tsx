/** @format */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employees from '../pages/employees';

const PageRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Employees />} />
    </Routes>
  </BrowserRouter>
);
export default PageRoutes;
