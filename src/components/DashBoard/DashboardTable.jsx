// import TableActions from "./TableActions.jsx";
import { useNavigate } from "react-router-dom";
import { allEmployees } from "../../mocks/handlers";

export function DashboardTable({ employeesData }) {
  const navigate = useNavigate();

  const itemList = employeesData.map((employee) => {
    return (
      <>
        <tr
          onClick={() => navigate(`/employee/${employee.employeeId}/`)}
          className="odd:bg-white even:bg-gray-100 hover:cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-[#7152F3] hover:ring-opacity-50"
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{`${employee.employeeFirstName} ${employee.employeeFirstName}`}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.employeeWorkId}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.employeeDepartment}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.employeeDesignation}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.employeeWorkType}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.employeeContractType}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            <span className={`${employee.attendanceStatus === "on-time" ? 'bg-[#ECF9F3]' : 'bg-[#FEEFF0]'} rounded-lg p-2 ${employee.attendanceStatus === "on-time" ? 'text-[#3FC28A]' : 'text-[#F45B69]'}`}>
              {employee.attendanceStatus}
            </span>
          </td>
        </tr>
      </>
    );
  });

  return (
    <div className="flex flex-col mb-20">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-y-scroll h-[500px]">
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
                    Employee Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Employee ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Designation
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Check In Time
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

             {employeesData.length ?  <tbody className="h-[50px]">{itemList}</tbody> : <div className="p-4 font-light italic text-red-800">No Employees have clocked in today yet.</div>}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
