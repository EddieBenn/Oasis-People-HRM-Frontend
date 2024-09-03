import React from "react";
import { Table } from "../../components/Table";
import Status from "../../components/Status";
import dayjs from "dayjs";

const EmployeeAttendance = ({ employeeDetails }) => {
  console.log(employeeDetails, "details");
  return (
    <section>
      <Table
        loading={false}
        tableData={employeeDetails.attendance}
        columns={[
          {
            header: "Date",
            view: (row) => <span>{dayjs(row.date).format('MMMM DD, YYYY')}</span>,
          },

          {
            header: "Check In",
            view: (row) => <span>{dayjs(row.clockIn).format("hh:mm A")}</span>,
          },
          {
            header: "Check Out",
            view: (row) => <span>{dayjs(row.clockOut).format("hh:mm A")}</span>,
          },
          {
            header: "Break",
            view: (row) => <span>{row.break}</span>,
          },
          {
            header: "Working Hours",
            view: (row) => <span>{row.workingHours}</span>,
          },
          {
            header: "Status",
            view: (row) => <Status status={row.status} />,
          },
        ]}
      />
    </section>
  );
};

export default EmployeeAttendance;
