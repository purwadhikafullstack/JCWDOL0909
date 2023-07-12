import React from "react";
import Sidebar from "../../components/Sidebar";
import AdminLayout from "../../components/AdminLayout";
import { useSelector } from "react-redux";

function Dashboard() {
  const adminGlobal = useSelector((state) => state.admins.admin);

  return (
    <AdminLayout>
      {adminGlobal.id_role === 2 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          welcome to admin branch Dashboard ...
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          welcome to Super Admin Dashboard ...
        </div>
      )}
    </AdminLayout>
  );
}

export default Dashboard;
