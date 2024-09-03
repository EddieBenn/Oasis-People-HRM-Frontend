import { AiOutlineEye } from "react-icons/ai";
import { RiEdit2Line } from "react-icons/ri"; import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from 'react-router-dom'

export default function TableActions({ employeeId }) {
  return (
    <div className="flex items-center justify-between text-lg font-semibold border-transparent text-gray-800
      disabled:opacity-50 disabled:pointer-events-none">
      <Link to={`/employee/${employeeId}/`} key={employeeId}>
        <AiOutlineEye className="hover:text-blue-800 hover:cursor-pointer" />
      </Link>
      <Link to={`/edit-employee/${employeeId}/`} key={employeeId}>
        <RiEdit2Line className="hover:text-blue-800 hover:cursor-pointer" />
      </Link>
      {/* <RiDeleteBin5Line className='hover:text-blue-800 hover:cursor-pointer' /> */}
    </div>
  )
}