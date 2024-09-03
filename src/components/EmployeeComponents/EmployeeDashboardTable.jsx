import {formatDate, formatTime} from '../../utilities/helpers';

export function EmployeeDashboardTable({ employeesData }) {

  const itemList = employeesData.map((employee) => {
    return (
      <>
        <tr
          className="odd:bg-white even:bg-gray-100 hover:cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-[#7152F3] hover:ring-opacity-50"
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          {formatDate(employee.date)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {formatTime(employee.clockInTime)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.clockInStatus}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.clockOutTime ? formatTime(employee.clockOutTime) : 'Not yet clocked out'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.clockOutStatus}
          </td>
        </tr>
      </>
    );
  });

  return (
    <div className="flex flex-col mb-20">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-y-scroll max:h-[400px]">
            <table
              border={2}
              className="min-w-full divide-y divide-gray-200 border font-lexend"
            >
              <thead>
                {/*Column Headers */}
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Check-in Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Clock-out Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Clock-out Status
                  </th>
                </tr>
              </thead>
              {/*Employee Row Data */}

             {employeesData.length ?  <tbody className="h-[50px]">{itemList}</tbody> : <div className="p-4 font-light italic text-red-800">You have not clocked in yet.</div>}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
