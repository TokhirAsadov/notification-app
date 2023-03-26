import React from 'react';
import {Route, Routes} from "react-router-dom";
import SuperAdminDashboard from "../components/super/SuperAdminDashboard";

const SuperAdmin = () => {
  return (
    <div>
      <Routes>
        <Route path={"/dashboard"} element={ <SuperAdminDashboard /> }/>
        {/*<Route path={"/user"} element={ <AdminUserAddPage /> }/>*/}

      </Routes>
    </div>
  );
};

export default SuperAdmin;