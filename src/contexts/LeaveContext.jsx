import React, { createContext, useContext, useState } from 'react';
import { fetchLeaveHistory} from '../axiosFolder/axiosFunctions/hrApi/hrApi';

const LeaveContext = createContext('');

export const useLeave = () => {
    const context = useContext(LeaveContext);
    if(!context){
        throw new Error('useLeave must be used within a LeaveProvider')
    }
    return context
}
export const LeaveProvider = ({ children } ) => {
    const [getLeaveHistory, setGetLeaveHistory] = useState([])

    const getAllLeave = async () => {
        const data = await fetchLeaveHistory()
       return setGetLeaveHistory(data.data.finalLeaveDetails)
    }


    return (
        <LeaveContext.Provider value={{ getLeaveHistory, getAllLeave }}>
            {children}
        </LeaveContext.Provider>
    )
}
