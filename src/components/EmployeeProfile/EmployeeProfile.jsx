import { NavigationTabs } from "./NavigationTabs.jsx";

export default function EmployeeProfile({ employee }) {

  return (
    <>
      {/* Navigation Tab for Employee Bio Data */}
      <div>
        <NavigationTabs employeeDetails={employee} />
      </div>
      {/* Employee Bio Data Details Conditioned on Nav Tab */}
    </>
  )
}