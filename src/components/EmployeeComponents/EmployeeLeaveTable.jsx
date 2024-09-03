import {formatDate, formatTime} from '../../utilities/helpers';

export function EmployeeLeaveTable({ employeesData }) {

  const itemList = employeesData.map((employee) => {
    return (
      <>
        <tr
          className="odd:bg-white even:bg-gray-100 hover:cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-[#7152F3] hover:ring-opacity-50"
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          {formatDate(employee.requestDate)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {formatTime(employee.startDate)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {formatTime(employee.endDate)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap flex flex-wrap justify-center items-center text-sm text-gray-800">
            {employee.reason}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.totalDays}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.status}
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
                    Request Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Reason
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Number of Days
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Status
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
