import LeaveTableActions from "../Leave/LeaveTableActions";

export function EmployeeLeaveProfileTable({ leaveData }) {
  const itemList = leaveData.map((leave) => {
    return (
      <>
        <tr className="odd:bg-white even:bg-gray-100 bg-blue-500 transition-transform duration-200 hover:shadow-lg hover:ring-2 hover:ring-[#7152F3] hover:ring-opacity-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {leave.dateRequested}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {leave.startDate}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {leave.endDate}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {leave.totalRequestedDays}
          </td>
          <td className="px-2 py-4 whitespace-nowrap flex justify-between text-end text-sm font-medium">
            {leave.status === "pending" ? <LeaveTableActions /> : leave.status}
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
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                  >
                    Days Requested
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                  >
                    Approval
                  </th>
                </tr>
              </thead>
              {/*Employee Row Data */}
              {leaveData.length > 0 ? (
                <tbody className="bg-green-600 ">{itemList}</tbody>
              ) : (
                <div className="p-4 font-light italic text-red-800">
                  Employee has not made any leave requests yet.
                </div>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
