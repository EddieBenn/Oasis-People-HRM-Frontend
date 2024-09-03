import React, { useEffect } from "react";
import DashboardCard from "../../components/DashBoard/Card";
import { IoIosPeople } from "react-icons/io";
import { FaRegCalendarCheck } from "react-icons/fa6";
import Chart from "../../components/DashBoard/Chart";
import { DashboardTable } from "../../components/DashBoard/DashboardTable";
import { getCurrentDate } from "../../utilities/helpers";
import { useEmployee } from "../../contexts/HrEmployeeContext";
import { useAttendance } from "../../contexts/AttendanceContext";

function DashboardPage() {
  const { allEmployees, getAllEmployees } = useEmployee();
  const {
    getDailyAttendance,
    dailyAttendance,
    late,
    early,
  } = useAttendance();

  useEffect(() => {
    getAllEmployees();
    getDailyAttendance();
  }, []);
  return (
    <div className="pr-4">
      <section className="px-6 py-2 lg:ml-[290px] flex flex-wrap gap-10 md:ml-[290px] sm:ml-0">
        <DashboardCard
          titleImg={IoIosPeople}
          title="Total Employees"
          data={allEmployees.length}
          figureImg={FaRegCalendarCheck}
          percentage={`Early Attendance this week: ${early}`}
          figBg="bg-[#EAF9F3]"
          figTxtCol="text-[#30BE82]"
          date={getCurrentDate()}
        />
        <DashboardCard
          titleImg={FaRegCalendarCheck}
          title="Total Attendance Today"
          data={dailyAttendance.length}
          figureImg={FaRegCalendarCheck}
          percentage={`Late Attendance this week: ${late}`}
          figBg="bg-[#FEEFF0]"
          figTxtCol="text-[#F45B69]"
          date={getCurrentDate()}
        />
      </section>
      <section className="lg:ml-[290px] px-6 py-2 flex md:ml-[290px] sm:ml-0">
        <Chart />
      </section>
      <section className="lg:ml-[290px] px-6 py-2 flex md:ml-[290px] sm:ml-0">
        <DashboardTable employeesData={dailyAttendance} />
      </section>
    </div>
  );
}

export default DashboardPage;
