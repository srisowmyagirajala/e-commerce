import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSideBar from "./sidebar";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSideBar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={setOpen} />

        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
