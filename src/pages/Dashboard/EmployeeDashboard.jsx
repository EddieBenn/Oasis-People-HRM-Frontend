import React, { useEffect, useState } from "react";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { getCurrentDate } from "../../utilities/helpers";
import { IoCalendarNumberOutline } from "react-icons/io5";
import EmployeeSidebar from "../../components/EmployeeComponents/EmployeeSidebar";
import Button from "../../components/Modal/ModalButton";
import Modal from "../../components/Modal/Modal";
import EmployeeDashboardCard from "../../components/EmployeeComponents/EmployeeCard";
import { requestLeave, getProfile, getLeaveHistory, getAttendanceHistory, clockIn, clockOut } from "../../axiosFolder/axiosFunctions/employeeApi/employeeApi";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utilities/toastifySetup";
import { EmployeeDashboardTable } from '../../components/EmployeeComponents/EmployeeDashboardTable';
import { EmployeeLeaveTable } from '../../components/EmployeeComponents/EmployeeLeaveTable'
import { formatDate } from '../../utilities/helpers';




function EmployeeDashboardPage() {
  const [clockInLoading, setClockInLoading] = useState(false);

  const [clockOutLoading, setClockOutLoading] = useState(false);

  const [leaveLoading, setLeaveLoading] = useState(false);

  const [leaveModal, setLeaveModal] = useState(false);

  const [attendanceModal, setAttendanceModal] = useState(false);

  const [profileModal, setProfileModal] = useState(false);

  const [leaveHistoryModal, setLeaveHistoryModal] = useState(false);

  const [leaveDetails, setLeaveDetails] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [late, setLate] = useState(0);
  const [early, setEarly] = useState(0);

  const fetchAttendance = async () => {
    try {
      const data = await getAttendanceHistory()
      if (data.status !== 200) {
        return;
      }
      setAttendanceHistory(data.data.attendance)
      setLate(data.data.lateDays)
      setEarly(data.data.onTimeDays)

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLeaveDetails({
      ...leaveDetails,
      [name]: value,
    });
  };

  const leaveRequest = async () => {
    try {
      setLeaveLoading(true);

      const data = await requestLeave(leaveDetails);

      if (data.status !== 200) {
        setLeaveLoading(false);
        return showErrorToast(data.data.message);
      }

      fetchLeave()
      fetchProfile()
      setLeaveLoading(false);
      setLeaveModal(false);
      setLeaveHistoryModal(true);

      setLeaveDetails({
        startDate: "",
        endDate: "",
        reason: "",
      });
      return showSuccessToast(data.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const clockInTimer = async () => {
    try {
      setClockInLoading(true);

      const data = await clockIn();

      if (data.status !== 200) {
        setClockInLoading(false);
        setAttendanceModal(true)
        return showErrorToast(data.data.message);
      }

      setClockInLoading(false);
      fetchAttendance()
      setAttendanceModal(true)
      return showSuccessToast(data.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  const clocckOutTimer = async () => {
    try {
      setClockOutLoading(true);

      const data = await clockOut();

      if (data.status !== 200) {
        setClockOutLoading(false);
        setAttendanceModal(true)
        return showErrorToast(data.data.message);
      }

      setClockOutLoading(false);
      fetchAttendance()
      setAttendanceModal(true)
      return showSuccessToast(data.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  const leaveModalButtons = [
    {
      label: `${leaveLoading ? "Loading" : "Submit"}`,
      onClick: () => {
        leaveRequest();
      },
      bg: "#7152F3",
      text: "#FFFFFF"
    },
  ];

  const [leaveHistory, setLeaveHistory] = useState([]);

  const [userProfile, setUserProfile] = useState({});

  const [usedLeave, setUsedLeave] = useState(0)

  const [unusedLeave, setUnusedLeave] = useState(0)

  const fetchLeave = async () => {
    try {
      const data = await getLeaveHistory()
      if (data.status !== 200) {
        return;
      }
      setLeaveHistory(data.data.leave)

    } catch (error) {
      console.log(error)
    }
  }

  const fetchProfile = async () => {
    try {
      const data = await getProfile()
      if (data.status !== 200) {
        return showErrorToast(data.data.message)
      }
      setUserProfile(data.data.user)
      setUsedLeave(data.data.user.usedLeaveDays)
      return setUnusedLeave(data.data.user.totalDaysLeft)

    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    fetchAttendance()
    fetchLeave()
    fetchProfile()
  }, [])
  return (
    <>
      <EmployeeSidebar />
      <div className="pr-4">
        <section className="px-6 py-2 lg:ml-[290px] flex flex-wrap gap-10 md:ml-[290px] sm:ml-0">
          <EmployeeDashboardCard
            titleImg={IoCalendarNumberOutline}
            title="Leave Summary"
            data={21}
            figureImg={IoCalendarNumberOutline}
            percentage={`Total Used: ${usedLeave}`}
            figBg="bg-[#EAF9F3]"
            figTxtCol="text-[#30BE82]"
            percentage2={`Total Remaining: ${unusedLeave}`}
            date={getCurrentDate()}
            figBg2="bg-[#F0F0F1]"
            figTxtCol2="text-[#A2A1A8]"
            heading="Total Leave Days: "
          />
          <EmployeeDashboardCard
            titleImg={FaRegCalendarCheck}
            title="Attendance Summary"
            data={attendanceHistory.length}
            heading="Total Attendance: "
            figureImg={FaRegCalendarCheck}
            percentage={`Total Early Days: ${early ? early : 0}`}
            percentage2={`Total Lateness: ${late ? late : 0}`}
            figBg="bg-[#EAF9F3]"
            figTxtCol="text-[#30BE82]"
            figBg2="bg-[#FEEFF0]"
            figTxtCol2="text-[#F45B69]"
            date={getCurrentDate()}
          />
        </section>
        <section className="lg:ml-[200px] md:ml-[200px] sm:ml-0 flex justify-center items-center flex-wrap flex-col">
          <div className="flex justify-between p-2 items-center w-[60%]">
            <div>
              <Button
                onClick={() => setLeaveModal(true)}
                title="Request Leave"
                bg="#02590F"
                text="white"
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={() => clockInTimer()} title={clockInLoading ? 'Loading...' : 'Clock In'} bg="#02590F" text="white" />
              <Button onClick={() => clocckOutTimer()} title={clockOutLoading ? 'Loading...' : "Clock Out"} bg="#880000" text="white" />
            </div>
          </div>
          <div className="flex w-[60%] justify-between mt-20">
            <Button
              onClick={() => setLeaveHistoryModal(true)}
              title="View Leave History"
              bg="#9B870c"
              text="white"
            />
            <Button
              onClick={() => setAttendanceModal(true)}
              title="View Attendance History"
              bg="#9B870c"
              text="white"
            />
          </div>
        </section>
        <section className="lg:ml-[130px] mt-10 md:ml-[130px] sm:ml-0 items-center flex flex-wrap flex-col">
          <div>
            <Button
              onClick={() => setProfileModal(true)}
              title="View Profile"
              bg="#7152F3"
              text="white"
            />
          </div>
        </section>
        {leaveModal && (
          <Modal
            onClose={() => {
              setLeaveModal(false);
              setLeaveDetails({ startDate: "", endDate: "", reason: "" });
            }}
            buttons={leaveModalButtons}
          >
            <div className="font-lexend bg-gray-400 rounded-lg py-10 p-2 w-full overflow-x-scroll flex flex-col gap-10 justify-center items-center text-center">
              <div className="italic font-light text-red-700">
                Please remember you must give at least 3 days leave notice
              </div>
              <div className="p-5 flex gap-2 items-center justify-center w-[60%]">
                <label for="startDate">Start Date</label>
                <input
                  id="startDate"
                  name="startDate"
                  value={leaveDetails.startDate}
                  onChange={handleChange}
                  type="date"
                  className="p-3 border w-[70%] rounded-lg"
                />
              </div>
              <div className="p-5 flex gap-2 items-center justify-center w-[60%]">
                <label for="endDate">End Date</label>
                <input
                  id="endDate"
                  name="endDate"
                  value={leaveDetails.endDate}
                  onChange={handleChange}
                  type="date"
                  className="p-3 border w-[70%] rounded-lg"
                />
              </div>
              <div className="p-5 flex gap-2 items-center justify-center w-[60%]">
                <label for="reason">Reason:</label>
                <textarea
                  id="reason"
                  name="reason"
                  value={leaveDetails.reason}
                  onChange={handleChange}
                  type="text"
                  className="p-3 h-40 border w-[70%] rounded-lg"
                />
              </div>
            </div>
          </Modal>
        )}
        {attendanceModal && (
          <Modal onClose={() => setAttendanceModal(false)}>
            <div className="font-lexend bg-gray-100 max-h-[500px] rounded-lg py-10 p-2 w-full overflow-x-scroll flex flex-col justify-center items-center text-center">
              <section className="mt-10 sm:ml-0 items-center flex flex-wrap flex-col">
                {attendanceHistory.length > 0 ? <EmployeeDashboardTable employeesData={attendanceHistory} /> : <div className="italic font-light p-3 text-red-900">No data to display.</div>}
              </section>
            </div>
          </Modal>
        )}
        {profileModal && (
          <Modal onClose={() => setProfileModal(false)}>
            <div className="font-lexend bg-gray-400 max-h-[500px] rounded-lg py-10 p-2 w-full overflow-y-scroll flex flex-col justify-center items-center text-center">
              <div className="flex flex-col w-[70%] mt-[300px] gap-5">
                <div className="flex justify-between gap-20">
                  <div className="flex gap-2">
                    <div className="font-bold">First Name:</div>
                    <div>{userProfile.firstName}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Last Name:</div>
                    <div>{userProfile.lastName}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">Department:</div>
                    <div>{userProfile.department}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Designation:</div>
                    <div>{userProfile.designation}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">Email:</div>
                    <div>{userProfile.email}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Work Email:</div>
                    <div>{userProfile.workEmail}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">Marital Status:</div>
                    <div>{userProfile.maritalStatus}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Employee ID:</div>
                    <div>{userProfile.employeeId}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">Gender:</div>
                    <div>{userProfile.gender}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Phone Number:</div>
                    <div>{userProfile.phone}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">Office Location:</div>
                    <div>{userProfile.officeLocation}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Date of Birth:</div>
                    <div>{userProfile.birthDate}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">Nationality:</div>
                    <div>{userProfile.nationality}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Home Address:</div>
                    <div>{userProfile.homeAddress}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">City:</div>
                    <div>{userProfile.city}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">District/State:</div>
                    <div>{userProfile.district}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">Zip Code:</div>
                    <div>{userProfile.zipCode}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Employment Type:</div>
                    <div>{userProfile.employeeType}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">Contract Type:</div>
                    <div>{userProfile.contractType}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Work Days:</div>
                    <div>{userProfile.workingDays.join(",")}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">Date of Recruitment</div>
                    <div>{formatDate(userProfile.hireDate)}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Slack Id:</div>
                    <div>{userProfile.slackId}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">Twitter Id:</div>
                    <div>{userProfile.twitterId}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Skype Id:</div>
                    <div>{userProfile.skypeId}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">GitHub Id:</div>
                    <div>{userProfile.githubId}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Bank Name:</div>
                    <div>{userProfile.bankBranch}</div>
                  </div>
                </div>
                <div className="flex gap-20 justify-between">
                  <div className="flex gap-2">
                    <div className="font-bold">Account Number:</div>
                    <div>{userProfile.bankAccountNumber}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-bold">Account Name:</div>
                    <div>{userProfile.accountName}</div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
        {leaveHistoryModal && (
          <Modal onClose={() => setLeaveHistoryModal(false)}>
            <div className="font-lexend bg-gray-100 max-h-[500px] overflow-y-scroll rounded-lg py-10 p-2 w-full flex flex-col justify-center items-center text-center">
              <section className="mt-10 sm:ml-0 items-center flex flex-wrap flex-col">
                {leaveHistory.length > 0 ? <EmployeeLeaveTable employeesData={leaveHistory} /> : <div className="italic font-light p-3 text-red-900">No data to display.</div>}
              </section>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

export default EmployeeDashboardPage;
