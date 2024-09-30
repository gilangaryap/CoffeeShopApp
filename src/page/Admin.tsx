import { Outlet } from "react-router-dom";
import { Header } from "../components/superAdmin/layout/Header";
import { Sidebar } from "../components/superAdmin/layout/Sidebar";

export const Admin = () => {
  return (
    <div className="container-fluid h-full w-full flex flex-col">
      <Header />
      <div className="grid grid-cols-[auto,1fr] h-screen w-full">
        <Sidebar />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};