import React from "react";
import { MdOutlineDashboard, MdOutlineFastfood } from "react-icons/md";
import { BsPersonGear } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";

const Sidebar = ({ active, setActive }) => {
  const mainTabs = [
    { name: "Overview", value: "overview", icon: <MdOutlineDashboard /> },
    { name: "Orders", value: "orders", icon: <MdOutlineFastfood /> },
  ];

  const settingTab = {
    name: "Settings",
    value: "settings",
    icon: <BsPersonGear />,
  };

  const renderTab = (tab) => (
    <li
      key={tab.value}
      className={`cursor-pointer p-2 rounded text-(--color-neutral) flex items-center gap-3 ${active === tab.value ? "bg-(--color-primary) text-(--color-primary-content) font-semibold" : "hover:bg-(--color-secondary) hover:text-(--color-secondary-content) transition-colors duration-200"}`}
      onClick={() => setActive(tab.value)}
    >
      {tab.icon} {tab.name}
    </li>
  );
  return <>
      <div className=" h-full flex flex-col">
        <ul className=" space-y-4 flex-1">
          {mainTabs.map((tab) => renderTab(tab))}
        </ul>
        <ul className=" space-y-4 border-t border-(--color-secondary) py-2">
          {renderTab(settingTab)}
        </ul>
      </div>
  </>;
};

export default Sidebar;
