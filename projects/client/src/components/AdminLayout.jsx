import React from "react";
import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="flex-1 bg-slate-500">{children}</div>
    </div>
  );
}

export default AdminLayout;
