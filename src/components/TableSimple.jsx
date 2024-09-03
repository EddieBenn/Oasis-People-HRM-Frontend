import TableActions from "./TableActions.jsx";
import { useNavigate } from "react-router-dom";

export function TableSimple({ employeesData }) {
  const navigate = useNavigate();

  const itemList = employeesData.map((employee) => {
    return (
      <>
        <tr
          onClick={() => navigate(`/employee/${employee.employeeId}/`)}
          className="odd:bg-white even:bg-gray-100 bg-blue-500 hover:cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-[#7152F3] hover:ring-opacity-50"
        >
          <td>
            <div className="rounded-lg px-6">
              <img
                src={employee.image}
                className="rounded-lg"
                width={40}
                alt="employee img"
              />
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium items-center">
            {" "}
            {`${employee.firstName} ${employee.lastName}`}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.employeeWorkId}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.department}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.designation}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.employeeType}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {employee.contractType}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
            <TableActions employeeId={employee.id} />
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
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Image
                  </th>
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
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              {/*Employee Row Data */}
              <tbody className="bg-green-600 ">{itemList}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
