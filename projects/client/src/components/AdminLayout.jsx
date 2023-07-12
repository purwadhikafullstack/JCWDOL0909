import React from "react";
import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: 300,
          position: "sticky",
          top: 0,
          height: "100%",
          overflowY: "auto",
          backgroundColor: "#f1f1f1",
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
        }}
      >
        <Sidebar />
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: "#fff",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
