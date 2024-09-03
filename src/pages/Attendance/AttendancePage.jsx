import Layout from "../../components/Layout";
import { Table } from "../../components/Table";
import SearchInput from "../../components/SearchInput";
import { useEffect } from "react";
import { useAttendance } from "../../contexts/AttendanceContext";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Attendance = () => {

  const {getDailyAttendance, dailyAttendance} = useAttendance()

  const navigate = useNavigate()

  useEffect(() => {
    getDailyAttendance()
  }, []);
  return (
    <Layout> 
      <section className="border border-solid border-[#A2A1A833] rounded-[10px] p-5">
        <div className="flex items-center justify-between mb-6">
          <SearchInput />  <Button onClick={() => navigate('/alltimeattendance')}>View All Time Attendance History</Button>
        </div>
        <Table
        loading={false}
          tableData={dailyAttendance}
          columns={[
            {
              header: "Employee Name",
              view: (row) => (
                <div className="flex gap-x-3 items-center"> 
                  {/* <span className="inline-block w-9 h-9 rounded-full"><img src="/icons/oasis-logo.png" alt="" className="h-full w-full rounded-full " /></span> */}
                  <span>{row.employeeFirstName} {row.employeeLastName}</span>
                </div>
              ),
            },

            {
              header: "Designation",
              view: (row) => <span>{row.employeeDesignation}</span>,
            },
            {
              header: "Type",
              view: (row) => <span>{row.employeeWorkType}</span>,
            },
            {
              header: "Check in Time",
              view: (row) => <span>{row.attendanceTime}</span>,
            },
            {
              header: "Status",
              view: (row) => <span className={`${row.attendanceStatus === "on-time" ? 'bg-[#ECF9F3]' : 'bg-[#FEEFF0]'} p-3 rounded-lg ${row.attendanceStatus === "on-time" ? 'text-[#3FC28A]' : 'text-[#F45B69]'}`}>{row.attendanceStatus}</span>,
            },
          ]}
        />
      </section>
    </Layout>
  );
};

// dayjs(row.clockIn).format('hh:mm A')
export default Attendance;
