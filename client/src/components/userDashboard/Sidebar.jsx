import React from "react";
import { MdOutlineDashboard, MdOutlineFastfood } from "react-icons/md";
import { PiListHeartLight } from "react-icons/pi";
import { BsPersonGear } from "react-icons/bs";

const MenuItems = [
  { name: "Overview", icon: <MdOutlineDashboard /> },
  { name: "Orders", icon: <MdOutlineFastfood /> },
  { name: "WishList", icon: <PiListHeartLight /> },
  { name: "Settings", icon: <BsPersonGear /> },
];

const Sidebar = ({ active, setActive }) => {
  return (
    <>
      <div className="bg-white border border-(--color-base-300) rounded-2xl shadow-sm p-4">
        <div className="pb-4 mb-4 border-b border-(--color-base-300) text-center">
          <h2 className="text-lg font-bold text-(--color-base-content)">
            User Dashboard
          </h2>
          <p className="text-xs text-(--color-secondary) mt-0.5">
            Manage your account
          </p>
        </div>

        <div className="space-y-1.5">
          {MenuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActive(item.name)}
              className={`flex gap-3 font-medium items-center w-full p-3 rounded-xl text-sm transition-all duration-200 ${
                active === item.name
                  ? "bg-(--color-primary) text-(--color-primary-content) shadow-sm"
                  : "text-(--color-secondary) border border-transparent hover:bg-(--color-base-100) hover:text-(--color-base-content) hover:border-(--color-base-300)"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;