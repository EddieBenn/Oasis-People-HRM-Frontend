import Layout from "../../components/Layout";
import { useEffect } from "react";
import {LeaveTable} from '../../components/Leave/LeaveTable';
import { useLeave } from "../../contexts/LeaveContext";

const AllLeaves = () => {

  const { getLeaveHistory, getAllLeave } = useLeave()

  useEffect(() => {
    getAllLeave()
  }, []);

  return (
    <Layout> 
      <section className="border border-solid border-[#A2A1A833] rounded-[10px] p-5">
        <div className="flex items-center justify-between mb-6">
        </div>
        <div className="font-bold text-[#7152F3]"><em>All Employees are Entitled to a maximum of 21 days of Leave a Year!</em></div>
        { getLeaveHistory.length > 0 ? <LeaveTable employeesData={getLeaveHistory}/> : <div className="italic font-light p-3 text-red-900">No data to display.</div>}
      </section>
    </Layout>
  );
};

// dayjs(row.clockIn).format('hh:mm A')
export default AllLeaves;
