import React from "react";
import Sidebar from "../../components/Sidebar";
import AdminLayout from "../../components/AdminLayout";
import { useSelector } from "react-redux";

function Dashboard() {
  const adminGlobal = useSelector((state) => state.admins.admin);

  return (
    <AdminLayout>
      {adminGlobal.id_role === 2 ? (
        <div>Ini Dashboard Branch Admin</div>
      ) : (
        <div>Ini Dashboard Super Admin</div>
      )}
    </AdminLayout>
  );
}

export default Dashboard;
