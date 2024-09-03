import axios from '../../configurations/axiosSetup'


export const requestLeave = async(body)=>{
    try{
      const response = await axios.post("/employee/request-leave", body,{
        headers: {
            "Content-Type" : "application/json"
        }
      })
    return response
    }catch(error){
      return error.response
    }
}

export const getLeaveHistory = async()=>{
    try{
        const response = await axios.get('/employee/view-leave-history')
        return response
    }catch(error){
        return error.response
      }
}

export const getAttendanceHistory = async()=>{
  try{
    const response = await axios.get(`/employee/view-attendance`)
    return response
}catch(error){
    return error.response
  }
}

export const getProfile = async()=>{
  try{
    const response = await axios.get(`/employee/view-profile`)
    return response
    
  }catch(error){
    return error.response
  }
}

export const clockIn = async()=>{
  try{
    const response = await axios.post(`/employee/clock-in`)
    return response
    
  }catch(error){
    return error.response
  }
}

export const clockOut = async()=>{
  try{
    const response = await axios.put(`/employee/clock-out`)
    return response
    
  }catch(error){
    return error.response
  }
}