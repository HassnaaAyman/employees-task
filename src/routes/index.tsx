/** @format */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateEmployee from '../pages/createEmployee';
import Employees from '../pages/employees';

const PageRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Employees />} />
      <Route path='/employees/create' element={<CreateEmployee />} />
    </Routes>
  </BrowserRouter>
);
export default PageRoutes;
