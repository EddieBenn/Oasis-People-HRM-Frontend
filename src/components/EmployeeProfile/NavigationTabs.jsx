import { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { SlBriefcase } from "react-icons/sl";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { formatDate } from "../../utilities/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utilities/toastifySetup";
import { changeEmployeeImage} from "../../axiosFolder/axiosFunctions/hrApi/hrApi";
import { useEmployee } from "../../contexts/HrEmployeeContext";



function NavigationTabs({ employeeDetails }) {
  const [activeTab, setActiveTab] = useState(1);

  const [imageLoader, setImageLoader] = useState(false);

  const navigate = useNavigate();

  const {getSingleEmployee} = useEmployee()

  const handleChangeTab = (newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const {id} = useParams();

  const handleImageChange = async (event) => {
    try{
    event.preventDefault();
    setImageLoader(true);
    const { files } = event.currentTarget;
    const file = files && files[0];
    if (file) {
      const imageSetter = new FormData()
      imageSetter.append("image", file)

      const data = await changeEmployeeImage(imageSetter, id)

      if(data.status !== 200){
        setImageLoader(false)
        return showErrorToast(data.data.message)
      }

      showSuccessToast(data.data.message)

      setImageLoader(false)

      return navigate(`/employees`)
    }

    setImageLoader(false)

    return showErrorToast("An error occurred, try again later.")
  }catch(error){
    console.log(error)
    setImageLoader(false)
    showErrorToast("An error occurred, try again later.")
  }
  };

  return (
    <>
      {/* Scrollable Navigation Employee Information Links */}
      <div className="w-full mx-auto">
        <ul className="flex flex-nowrap items-center space-x-3 overflow-x-auto pb-4 snap-x snap-mandatory">
          <li
            onClick={() => handleChangeTab(1)}
            className={`${
              activeTab === 1 ? "pb-1 border-b-2 border-b-[#7152f3]" : ""
            }
          font-lexend whitespace-nowrap hover:border-0 cursor-pointer snap-center snap-always`}
          >
            <IoMdPerson
              className={`${
                activeTab === 1 ? "text-[#7152f3]" : "text-gray-500"
              } inline-flex items-center mr-3 text-2xl`}
            />
            <span
              className={`${
                activeTab === 1 ? "text-[#7152f3]" : "text-gray-500"
              } text-sm font-semibold`}
            >
              Personal Information
            </span>
          </li>
          <li
            className={`${
              activeTab === 2 ? "pb-1 border-b-2 border-b-[#7152f3]" : ""
            }
          font-lexend whitespace-nowrap hover:border-0 cursor-pointer snap-center snap-always`}
            onClick={() => handleChangeTab(2)}
          >
            <SlBriefcase
              className={`${
                activeTab === 2 ? "text-[#7152f3]" : "text-gray-500"
              } inline-flex items-center mr-3 text-2xl`}
            />
            <span
              className={`${
                activeTab === 2 ? "text-[#7152f3]" : "text-gray-500"
              } text-sm font-semibold`}
            >
              Professional Information
            </span>
          </li>
          <li
            role="button"
            className={`${
              activeTab === 3 ? "pb-1 border-b-2 border-b-[#7152f3]" : ""
            }
          font-lexend whitespace-nowrap hover:border-0 cursor-pointer snap-center snap-always`}
            onClick={() => handleChangeTab(3)}
          >
            <IoNewspaperOutline
              className={`${
                activeTab === 3 ? "text-[#7152f3]" : "text-gray-500"
              } inline-flex items-center mr-3 text-2xl`}
            />
            <span
              className={`${
                activeTab === 3 ? "text-[#7152f3]" : "text-gray-500"
              } text-sm font-semibold`}
            >
              Documents
            </span>
          </li>
          <li
            className={`${
              activeTab === 4 ? "pb-1 border-b-2 border-b-[#7152f3]" : ""
            }
          font-lexend whitespace-nowrap hover:border-0 cursor-pointer snap-center snap-always`}
            onClick={() => handleChangeTab(4)}
          >
            <MdLockOutline
              className={`${
                activeTab === 4 ? "text-[#7152f3]" : "text-gray-500"
              } inline-flex items-center mr-3 text-2xl`}
            />
            <span
              className={`${
                activeTab === 4 ? "text-[#7152f3]" : "text-gray-500"
              } text-sm font-semibold`}
            >
              Social Media
            </span>
          </li>
        </ul>
      </div>

      {/* Separator */}
      <hr className="pt-4" />

      {/* Navigation Conditioned Content */}
      <div>
        {/* Personal Information - Grid 1 Side */}
        <div
          className={`${
            activeTab === 1 ? "block" : "hidden"
          } py-4 grid grid-cols-2 gap-x-8`}
        >
          <div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                First Name
              </h3>
              <p className="text-sm font-lexend">{employeeDetails.firstName}</p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Mobile Number
              </h3>
              <p className="text-sm font-lexend">{employeeDetails.phone}</p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Date of Birth
              </h3>
              <p className="text-sm font-lexend">
                {formatDate(employeeDetails.birthDate)}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">Gender</h3>
              <p className="text-sm font-lexend">{employeeDetails.gender}</p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Address
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.homeAddress}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Nationality
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.nationality}
              </p>
            </div>
          </div>
          {/* Personal Information Grid Two Side */}
          <div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Last Name
              </h3>
              <p className="text-sm font-lexend">{employeeDetails.lastName}</p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Personal Email Address
              </h3>
              <p className="text-sm font-lexend">{employeeDetails.email}</p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Martial Status
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.maritalStatus}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">City</h3>
              <p className="text-sm font-lexend">{employeeDetails.city}</p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Zip Code
              </h3>
              <p className="text-sm font-lexend">{employeeDetails.zipCode}</p>
            </div>
          </div>
        </div>
        {/* Professional Information Grid 1 Side */}
        <div
          className={`${
            activeTab === 2 ? "block" : "hidden"
          } py-4 grid grid-cols-2 gap-x-8`}
        >
          <div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Employee ID
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.employeeId}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Employee Type
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.employeeType}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Department
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.department}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Working Days
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.workingDays}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Date Hired
              </h3>
              <p className="text-sm font-lexend">
                {formatDate(employeeDetails.hireDate)}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Leave Days Used
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.usedLeaveDays}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Leave Days Left
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.totalDaysLeft}
              </p>
            </div>
            {/* <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">Office Location</h3>
              <p className="text-sm font-lexend">{employeeDetails.officeLocation}</p>
            </div> */}
          </div>
          {/* Professional Information Grid Two Side */}
          <div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Bank Name
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.bankBranch}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Bank Account Name
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.accountName}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Bank Account Number
              </h3>
              <p className="text-sm font-lexend">
                {employeeDetails.bankAccountNumber}
              </p>
            </div>
          </div>
        </div>
        {/* Documents - Grid Section - For Future Refactoring */}
        <div className={`${activeTab === 3 ? "block" : "hidden"}`}>
          <div className="py-4">
            <div className="flex gap-4">
              <img
                src={employeeDetails.image}
                alt="Employee Image"
                className="border w-[300px] h-[300px]"
              />{" "}
              <div className="flex flex-col gap-4">
              <label className="italic font-light text-red-800">{ imageLoader ? 'Loading...' : "Click Below to Change Image"}</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="border h-[50px] py-2 px-2 w-[300px] flex text-center justify-center items-center bg-[#7152F3] hover:border-[#7152F3] hover:text-[#7152F3] text-white rounded-lg hover:cursor-pointer hover:bg-white"
              />
              </div>
            </div>
          </div>
        </div>
        {/* Account Access Grid 1 Side */}
        <div
          className={`${
            activeTab === 4 ? "block" : "hidden"
          } py-4 grid grid-cols-2 gap-x-8`}
        >
          <div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Slack ID
              </h3>
              <p className="text-sm font-lexend">{employeeDetails.slackId}</p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Skype ID
              </h3>
              <p className="text-sm font-lexend">{employeeDetails.skypeId}</p>
            </div>
          </div>
          {/* Account Access Grid Two Side */}
          <div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Twitter ID
              </h3>
              <p className="text-sm font-lexend">{employeeDetails.twitterId}</p>
            </div>
            <div className="pb-4">
              <h3 className="font-lexend text-xs text-gray-400 pb-1">
                Github ID
              </h3>
              <p className="text-sm font-lexend">{employeeDetails.githubId}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { NavigationTabs };
