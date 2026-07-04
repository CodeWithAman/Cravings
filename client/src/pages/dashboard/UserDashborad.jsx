import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/userDashboard/Sidebar";
import Overview from "../../components/userDashboard/Overview";
import Orders from "../../components/userDashboard/Orders";
import Settings from "../../components/userDashboard/Settings";
import WishList from "../../components/userDashboard/WishList";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const UserDashboard = () => {
  const [active, setActive] = useState("Overview");
  const { user } = useAuth();

  return (
    <>
      <div className="flex min-h-[92vh] bg-(--color-base-100)">
        {/* Sidebar */}
        <div className="w-1/6 bg-(--color-base-100) p-4">
          <Sidebar active={active} setActive={setActive} />
        </div>

        {/* Content Area */}
        <div className="w-5/6 p-6">
          {/* Greeting Banner */}
          <div className="bg-white border border-(--color-base-300) rounded-2xl shadow-sm p-5 mb-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-(--color-base-300) shrink-0">
              <img
                src={user?.photo}
                alt={user?.fullname}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-(--color-base-content)">
                {getGreeting()}, {user?.fullname?.split(" ")[0]} 👋
              </h2>
              <p className="text-sm text-(--color-secondary)">
                Here's what's happening with your account today 🍔
              </p>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white border border-(--color-base-300) rounded-2xl shadow-sm p-6">
            {active === "Overview" && <Overview />}
            {active === "Orders" && <Orders />}
            {active === "WishList" && <WishList />}
            {active === "Settings" && <Settings />}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;