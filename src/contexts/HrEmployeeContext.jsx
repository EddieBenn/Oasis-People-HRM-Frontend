import React, { createContext, useContext, useState } from 'react';
import { viewAllEmployees, fetchSingleEmployee } from '../axiosFolder/axiosFunctions/hrApi/hrApi';

const EmployeeContext = createContext('');

export const useEmployee = () => {
    const context = useContext(EmployeeContext);
    if(!context){
        throw new Error('useEmployee must be used within a EmployeeProvider')
    }
    return context
}
export const EmployeeProvider = ({ children } ) => {
    const [allEmployees, setAllEmployees] = useState([])

    const getAllEmployees = async () => {
        const data = await viewAllEmployees()
       return setAllEmployees(data.data.employeesToReturn)
    }

    const getSingleEmployee = async(id) => {
        const data = await fetchSingleEmployee(id)
        return data
    }

    return (
        <EmployeeContext.Provider value={{ allEmployees, getSingleEmployee, setAllEmployees, getAllEmployees }}>
            {children}
        </EmployeeContext.Provider>
    )
}
