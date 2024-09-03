import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root.jsx";
import Home from "./pages/Home/Home.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import EmployeesPage from "./pages/Employees/EmployeesPage.jsx";
import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile.jsx";
import NewEmployeePage from "./pages/Employee/NewEmployeePage.jsx";
import { ToastContainer } from "react-toastify";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import MockAPITest from "./components/MockAPITest.jsx";
import "react-toastify/dist/ReactToastify.css";
import AttendancePage from "./pages/Attendance/AttendancePage.jsx";
import EmployeePage from "./pages/Employee/EmployeePage.jsx";
import ErrorPage from "./pages/ErrorDefaultPage.jsx";
import AllLeaves from "./pages/LeavePages/AllLeaves.jsx";
import EditEmployeePage from "./pages/Employee/EditEmployeePage.jsx";
import { EmployeeProvider } from './contexts/HrEmployeeContext.jsx';
import { AttendanceProvider } from './contexts/AttendanceContext.jsx';
import AllTimeAttendance from "./pages/Attendance/AllTimeAttendancePage.jsx";
import { LeaveProvider } from './contexts/LeaveContext.jsx';
import EmployeeDashboardPage from './pages/Dashboard/EmployeeDashboard.jsx';


const routes = createBrowserRouter([
  {
    path: '/', element: <Home/>
  },
  {
    path: '/employeeDashboard',
    element: <EmployeeDashboardPage />
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/employees",
        element: <EmployeesPage />,
      },
      {
        path: "/attendance",
        element: <AttendancePage />,
      },
      {
        path: '/alltimeattendance',
        element: <AllTimeAttendance />
      },
      {
        path: "/employee/:id",
        element: <EmployeePage />,
        // loader: async ({ params }) => {
        //   return await fetch(`/api/user/employees/${params.id}`);
        // }
      },
      {
        path: "/add-employee",
        element: <NewEmployeePage />,
      },
      {
        path: "/edit-employee/:id",
        element: <EditEmployeePage />,
      },
      {
        path: "/all-leave",
        element: <AllLeaves />,
      },
      {
        path: "/mock-api",
        element: <MockAPITest />,
      },
    ],
  },
]);

function App() {
  return (
    <>
    <ToastContainer />
    <ThemeContextProvider>
      <EmployeeProvider>
        <AttendanceProvider>
          <LeaveProvider>
    <RouterProvider router={routes} />
    </LeaveProvider>
    </AttendanceProvider>
    </EmployeeProvider>
    </ThemeContextProvider>
    </>
  );
}

export default App;
