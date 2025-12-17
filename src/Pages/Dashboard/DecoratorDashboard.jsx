import React from "react";
import Earnings from "./Earnings";
import TodaysSchedule from "./TodaysSchedule";
import AssignedProjects from "./AssignedProjects";

const DecoratorDashboard = () => {
  return (
    <div className="space-y-12">
      <div>
        <Earnings></Earnings>
      </div>
      <div>
        <TodaysSchedule></TodaysSchedule>
      </div>
      <div>
        <AssignedProjects></AssignedProjects>
      </div>
    </div>
  );
};

export default DecoratorDashboard;
