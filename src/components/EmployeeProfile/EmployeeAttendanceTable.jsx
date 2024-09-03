import LeaveTableActions from "../Leave/LeaveTableActions";

export function EmployeeAttendanceTable({ attendance }) {
  const itemList = attendance.map((attend) => {
    return (
      <>
        <tr className="odd:bg-white even:bg-gray-100 bg-blue-500 transition-transform duration-200 hover:shadow-lg hover:ring-2 hover:ring-[#7152F3] hover:ring-opacity-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {attend.date}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {attend.clockInTime}
          </td>
          <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">
            {attend.clockInStatus}
          </td>
          <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">
            {attend.clockOutTime}
          </td>
          <td className="px-6 text-center py-4 whitespace-nowrap text-sm font-medium">
            {attend.clockOutStatus}
          </td>
        </tr>
      </>
    );
  });

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-y-scroll h-[500px]">
            <table className="min-w-full divide-y divide-gray-200 font-lexend">
              <thead>
                {/*Column Headers */}
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                  >
                    Clock-In Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                  >
                    Clockout Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                  >
                    Clockout Status
                  </th>
                </tr>
              </thead>
              {/*Employee Row Data */}
              {attendance.length > 0 ? (
                <tbody className="bg-green-600 ">{itemList}</tbody>
              ) : (
                <div className="p-4 font-light italic text-red-800">
                  Employee has not clocked in yet.
                </div>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
