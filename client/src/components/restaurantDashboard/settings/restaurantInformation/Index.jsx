import React from "react";
import PresonalInformation from "./PersonalInformation";
import RestaurantInformation from "./RestaurantInformation";
import LeagalInformation from "./LegalInformation";

const Index = () => {
  return (
    <>
      <div className="overflow-y-auto h-full space-y-1.5">
        <PresonalInformation />
        <RestaurantInformation />
        <LeagalInformation />
      </div>
    </>
  );
};

export default Index;
