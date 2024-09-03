import { useEffect, useState } from 'react';
import { showErrorToast, showSuccessToast } from '../../utilities/toastifySetup';
import {handleLeave} from '../../axiosFolder/axiosFunctions/hrApi/hrApi'
import { useLeave } from "../../contexts/LeaveContext";
import { useNavigate } from 'react-router-dom';

export default function LeaveTableActions({ userId, leaveId }) {

  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const navigate = useNavigate();
  const { getAllLeave } = useLeave()

  const handleApprove = async (instruction) => {
    try {

      instruction === 'Approved' ? setApproveLoading(true) : setRejectLoading(true);

      const body = new FormData();

      body.append('approvalStatus', instruction);

      const data = await handleLeave(leaveId, body);

      if(data.status !== 200){
        instruction === 'Approved' ? setApproveLoading(false) : setRejectLoading(false);
        return showErrorToast(data.data.message)
      }

      instruction === 'Approved' ? setApproveLoading(false) : setRejectLoading(false);

      getAllLeave()
      
      showSuccessToast(data.data.message);


      return navigate(`/employee/${userId}`)

    }catch(error){
      return error.response
    }

  }
  useEffect(() => {
    getAllLeave()
  },[handleApprove])
  return (
    <div
      className="flex items-center justify-between gap-2 text-lg font-semibold border-transparent text-gray-800
      disabled:opacity-50 disabled:pointer-events-none"
    >
      <button onClick={()=> handleApprove('Approved')} className="border rounded-lg p-3 text-white text-xs bg-green-700 hover:cursor-pointer hover:bg-white hover:text-green-700">
        {approveLoading ? 'Loading' : 'Approve'}
      </button>
      <button onClick={()=> handleApprove('Rejected')} className="border rounded-lg p-3 text-white text-xs bg-red-700 hover:cursor-pointer hover:bg-white hover:text-red-700">
        {rejectLoading ? 'Loading' : 'Reject'}
      </button>
    </div>
  );
}
