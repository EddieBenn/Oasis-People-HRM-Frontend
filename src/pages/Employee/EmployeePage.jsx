import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeProfile from "../../components/EmployeeProfile/EmployeeProfile.jsx";
import { SlBriefcase } from "react-icons/sl";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { LuCalendarCheck } from "react-icons/lu";
import { LiaClipboardCheckSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { fetchSingleEmployee, editAnEmployee, fetchAnEmployeeAttendanceHistory, deleteEmployee, fetchAnEmployeeLeaveDetails } from '../../axiosFolder/axiosFunctions/hrApi/hrApi.js'
import { EmployeeAttendanceTable } from '../../components/EmployeeProfile/EmployeeAttendanceTable.jsx';
import Modal from "../../components/Modal/Modal.jsx";
import { EmployeeLeaveProfileTable } from "../../components/EmployeeProfile/LeaveProfile.jsx";
import { MdDeleteForever } from "react-icons/md";
import { showSuccessToast, showErrorToast } from "../../utilities/toastifySetup.js";



export default function EmployeePage() {
  const [employee, setEmployee] = useState({})

  const [editLoading, setEditLoading] = useState(false)

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { id } = useParams();

  const [employeeLeave, setEmployeeLeave] = useState([])

  const [employeeAttendance, setEmployeeAttendance] = useState([])

  const [showModal, setShowModal] = useState(false)

  const [modalData, setModalData] = useState({})

  const [changeModalData, setChangeModalData] = useState({})

  const [deleteLoading, setDeleteLoading] = useState(false)

  const navigate = useNavigate()

  const showMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [activeLink, setActiveLink] = useState(1);
  const [tab, setTab] = useState("profile");

  const handleChangeLink = (newActiveLink, tab) => {
    setActiveLink(newActiveLink);
  }

  const getEmployeeDetails = async (id) => {
    try {
      const data = await fetchSingleEmployee(id)
      setEmployee(data.data.employee)
      setModalData(data.data.employee)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getEmployeeLeaveDetails = async (id) => {
    try {
      const data = await fetchAnEmployeeLeaveDetails(id)
      setEmployeeLeave(data.data.finalLeaveRequests)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getEmployeeAttendanceDetails = async (id) => {
    try {
      const data = await fetchAnEmployeeAttendanceHistory(id)
      setEmployeeAttendance(data.data.finalAttendance)
    } catch (error) {
      console.log(error.message)
    }
  }

  const editProfileChange = (e) => {
    const { name, value } = e.target;
    setChangeModalData({ ...changeModalData, [name]: value });
  };

  const updateEmployeeProfile = async (e) => {
    try {
      const body = {
        firstName: changeModalData.firstName,
        lastName: changeModalData.lastName,
        phone: changeModalData.phone,
        address: changeModalData.address,
        employmentType: changeModalData.employmentType,
        department: changeModalData.department,
        contractType: changeModalData.contractType
      }

      setEditLoading(true)

      const data = await editAnEmployee(body, id)

      if (data.status !== 200) {
        setEditLoading(false)
        return showErrorToast(data.data.message)
      }

      getEmployeeDetails(id)
      setEditLoading(false)

      showSuccessToast(data.data.message)

      return setShowModal(false)


    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteEmployeeProfile = async () => {
    try {

      setDeleteLoading(true)

      const data = await deleteEmployee(id)

      if (data.status !== 200) {
        return showErrorToast(data.data.message)
      }

      showSuccessToast(data.data.message)

      return navigate('/employees')
    } catch (error) {
      console.log(error.message)
    }
  }

  const modalButtons = [
    {
      label: `${editLoading ? 'Loading' : 'Update'}`,
      onClick: () => {updateEmployeeProfile()},
      bg: "#7152F3", // Replace with your desired color
      text: "#FFFFFF", // Replace with your desired color
    },
  ];

  useEffect(() => {
    getEmployeeDetails(id)
    getEmployeeAttendanceDetails(id)
    getEmployeeLeaveDetails(id)
  }, [])

  return (
    <>
      <div className="mx-1 mt-7 md:max-w-screen-lg md:ml-72 md:mr-5">
        <div className="border rounded-lg border-gray-300">
          {/* Employee Names + Edit Button */}

          <div>
            {/* Employee Profile */}
            <div className="md:flex md:justify-between md:items-center">
              <div className="p-4 flex justify-between items-center">
                {/* Employee Image */}
                <div className="border border-gray-100 rounded-lg overflow-clip">
                  <img className="block mx-auto h-28 p-1 rounded-2xl sm:max-0 sm:shrink-0"
                    src={employee.image} alt="Jane Doe" />
                </div>
                {/* Employee Email-Title */}
                <div className="font-poppins *:pb-2">
                  <h1 className="text-xl font-semibold text-gray-900">{`${employee.firstName} ${employee.lastName}`}</h1>
                  <div className="flex space-x-2 items-center">
                    <SlBriefcase className="text-gray-900 text-xl" />
                    <p className="font-medium text-sm text-gray-900">{employee.designation}</p>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <HiOutlineEnvelope className="text-gray-800 text-xl" />
                    <p className="font-medium text-sm text-gray-800">{employee.workEmail}</p>
                  </div>
                </div>
              </div>
              {/* Edit Button */}
              <div className="flex justify-end gap-4 pr-4 pb-6 md:self-end">
                <button className="bg-[#7152f3] rounded-lg" onClick={() => setShowModal(true)}>
                  <div className="py-2 px-3">
                    <PiPencilSimpleLineLight className="inline-flex items-center mr-2 text-xl text-white" />
                    <span className="font-lexend text-white text-sm font-thin">Edit Profile</span>
                  </div>
                </button>
                <button className="bg-red-900 rounded-lg" onClick={() => deleteEmployeeProfile()}>
                  <div className="py-2 px-3">
                    <MdDeleteForever className="inline-flex items-center mr-2 text-xl text-white" />
                    <span className="font-lexend text-white text-sm font-thin">{ deleteLoading ? 'Loading...' : 'Delete Profile' }</span>
                  </div>
                </button>
              </div>
            </div>
            {/* hr line Separator */}
            <hr className="mx-4 bg-gray-300" />
          </div>
          {/* Employee Element Links + Accompanying Element Details */}
          <div className="pt-0 md:flex md:justify-between md:items-start md:mt-5">
            {/* Employee Links Toggle Button for Mobile */}
            <div
              className="md:hidden mx-3.5 border-gray-200 rounded-lg bg-[#7152f3] focus:border-blue-500
            focus:ring-blue-500"
            >
              <div className="flex justify-between items-center py-3 font-lexend text-white">
                <span className="pl-4 text-sm">Profile</span>
                <button onClick={showMenu}><MdKeyboardArrowDown className="text-xl" /></button>
              </div>
            </div>
            {/* Drop down Element Links Content Component */}
            <div
              className={`border border-b-gray-300 rounded-lg mx-3.5 shadow-lg
           ${
             isMenuOpen
               ? "transition-all ease-out duration-150"
               : "hidden md:block"
           }`}
            >
              <div className="*:pl-4 md:*:pr-20 *:font-lexend *:text-gray-800 *:py-3 cursor-pointer overflow-hidden">
                <div role="button" onClick={() => handleChangeLink(1)}
                  className={`${activeLink === 1 ? 'bg-[#7152f3] *:text-white hover:bg-[#7152f3]' : ''}
                      hover:bg-gray-100 md:whitespace-nowrap`}>
                  <Link to={``}>
                    <IoMdPerson className="inline-flex mr-2 text-xl items-center" />
                    <span className="text-sm font-medium">Profile</span>
                  </Link>
                </div>
                <div role="button" onClick={() => handleChangeLink(2)}
                  className={`${activeLink === 2 ? 'bg-[#7152f3] overflow-hidden *:text-white hover:bg-[#7152f3]' : ''}
                      hover:bg-gray-100 md:whitespace-nowrap`}>
                  <Link to={``}>
                    <LuCalendarCheck className="inline-flex mr-2 text-xl items-center" />
                    <span className="text-sm font-medium">Attendance</span>
                  </Link>
                </div>
                {/* <div role="button" onClick={() => handleChangeLink(3)}
                     className={`${activeLink === 3 ? 'bg-[#7152f3] *:text-white hover:bg-[#7152f3]': ''}
                      hover:bg-gray-100 md:whitespace-nowrap`}>
                  <Link to={`employee/:id/projects`}>
                    <IoNewspaperOutline className="inline-flex mr-2 text-xl items-center"/>
                    <span className="text-sm font-medium">Projects</span>
                  </Link>
                </div> */}
                <div role="button" onClick={() => handleChangeLink(3)}
                  className={`${activeLink === 3 ? 'bg-[#7152f3] *:text-white hover:bg-[#7152f3]' : ''}
                      hover:bg-gray-100 md:whitespace-nowrap`}>
                  <Link to={``}>
                    <LiaClipboardCheckSolid className="inline-flex mr-2 text-xl items-center" />
                    <span className="text-sm font-medium">Leave</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Accompanying Element Details Default to Children later */}
            <div className="flex items-start justify-start">
              {activeLink === 1 && <EmployeeProfile employee={employee} />}
              {activeLink === 2 && <EmployeeAttendanceTable attendance={employeeAttendance} />}
              {activeLink === 3 && <EmployeeLeaveProfileTable leaveData={employeeLeave} />}
            </div>
          </div>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} buttons={modalButtons}>
            <div className="font-lexend bg-gray-400 rounded-lg py-10 p-2 w-full overflow-x-scroll flex flex-col justify-center items-center text-center">
              <div className="flex justify-between items-center gap-4 w-full"><label>First Name:</label><input type="text" name="firstName" onChange={editProfileChange} value={setChangeModalData.firstName} placeholder={modalData.firstName} className="border w-[84%] p-3 mb-2 rounded-lg" /></div>
              <div className="flex justify-between items-center gap-4 w-full"><label>Last Name:</label><input type="text" name="lastName" onChange={editProfileChange} value={setChangeModalData.lastName} placeholder={modalData.lastName} className="border w-[84%] p-3 mb-2 rounded-lg" /></div>
              <div className="flex justify-between items-center gap-6 w-full"><label>Phone:</label><input type="number" name="phone" onChange={editProfileChange} value={setChangeModalData.phone} placeholder={modalData.phone} className="border w-[84%] p-3 mb-2 rounded-lg" /></div>
              <div className="flex justify-between items-center gap-4 w-full"><label>Address:</label><input type="text" name="address" onChange={editProfileChange} value={setChangeModalData.address} placeholder={modalData.homeAddress} className="border w-[84%] p-3 mb-2 rounded-lg" /></div>
              <div className="flex justify-between items-center gap-4 w-full"><label>Employee ID:</label><input type="text" name="employeeId" onChange={editProfileChange} disabled placeholder={modalData.employeeId} className="bg-blue-100 border w-[84%] p-3 mb-2 rounded-lg" /></div>
              <div className="flex justify-between items-center gap-4 w-full"><label>Office Type:</label><input type="text" name="employmentType" onChange={editProfileChange} value={setChangeModalData.employmentType} placeholder={modalData.employeeType} className="border w-[84%] p-3 mb-2 rounded-lg" /></div>
              <div className="flex justify-between items-center gap-4 w-full"><label>Department:</label><input type="text" name="department" onChange={editProfileChange} value={setChangeModalData.department} placeholder={modalData.department} className="border w-[84%] p-3 mb-2 rounded-lg" /></div>
              <div className="flex justify-between items-center gap-4 w-full"><label>Contract Type:</label><input type="text" name="contractType" onChange={editProfileChange} value={setChangeModalData.contractType} placeholder={modalData.contractType} className="border w-[84%] p-3 mb-2 rounded-lg" /></div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
