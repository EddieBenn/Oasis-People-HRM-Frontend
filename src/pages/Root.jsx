import {Outlet} from "react-router-dom";
import Sidebar from "../components/SideBar.jsx";
import Navbar from "../components/Navbar.jsx";
import EmployeesContextProvider from "../contexts/EmployeesContext.jsx";

function Root() {
  return (
    <EmployeesContextProvider>
      <div className=''>
        <Sidebar/>
        <Navbar/>
        {/* all the other HR features */}
        <div>
          <Outlet/>
        </div>
      </div>
    </EmployeesContextProvider>
  )
}

export default Root;