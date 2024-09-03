import { createContext, useState, useEffect } from "react";

export const EmployeesContext = createContext('');

export const EmployeesContextProvider = ({ children }) => {
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    fetch('/api/user/employees').then(res => res.json()).then(res => setEmployees(res.results));
  }, []);
  return (
    <EmployeesContext.Provider value={{ employees }}>
      { children }
    </EmployeesContext.Provider>
  )
}

export default EmployeesContextProvider