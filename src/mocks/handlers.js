// import jwt from 'jsonwebtoken';
import { http, HttpResponse } from "msw";
import janeDoe from '../assets/employees/Jane-Doe.jpeg';
import kkk from '../assets/employees/kkk.jpeg';
import kasito from '../assets/employees/kasito.jpeg'
import joe from '../assets/employees/joe.jpeg'
import jack from '../assets/employees/jack.jpeg'
import victor from '../assets/employees/victor.jpeg';
import julia from '../assets/employees/julia.jpeg';
import ralph from '../assets/employees/ralph.png';
import rick from '../assets/employees/rick.jpeg';
import esty from '../assets/employees/esty.jpeg';

// A Map of existing Employees kept in memory.
export const allEmployees = {
  results: [
    {
      url: "/api/user/employee/1",
      id: 1,
      firstName: "Jane",
      image: janeDoe,
      lastName: "Doe",
      middleName: "Yusuf",
      profile: [
        {
          employeeId: "OASIS-0001",
          nextOfKin: "Akemini",
          gender: "female",
          Company: "Tea Estate Company",
          username: "random_guess",
          mobileNumber: "1234567890",
          email: "janed@yahoo.com",
          workEmail: "janed@campany.com",
          birthDate: "2019-02-02",
          maritalStatus: "Divorced",
          nationality: "Alien",
          homeAddress: "2617 South Robinson Avenue, Oklahoma City",
          city: "Nairobi",
          district: "Kairo",
          zipCode: "0345",
          department: "Design",
          designation: "UI/UX Designer",
          employeeType: "Onsite",
          contractType: "Permanent",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          hireDate: "2019-02-02",
          officeLocation: "America",
          socialAccounts: {
            slackId: "1234567890",
            twitterId: "@janedElone",
            skypeId: "GoodYesu",
            githubId: "@rayJane",
          },
          bankBranch: "Axis Bank/Gachibowli",
          bankAccountNumber: "1234567890",
          accountName: "Janed-Elone",
          isManager: false,
        },
      ],
      attendance: [
        {
          id: 5,
          userId: 1,
          clockIn: "2024-05-16T13:34:22.731923+03:00",
          clockOut: "2024-05-16T22:35:26.241943+03:00",
          status: "On Time",
          date:"2024-05-16T22:35:26.241943+03:00",
          break:"00:30 Min",
          workingHours: "09:02 Hrs"
        },
        {
          id: 9,
          userId: 1,
          clockIn: "2024-05-17T12:34:22.731923+03:00",
          clockOut: "2024-05-17T23:35:26.241943+03:00",
          status: "On Time",
          date:"2024-05-16T22:35:26.241943+03:00",
          break:"00:30 Min",
          workingHours: "09:02 Hrs"
        },
        {
          id: 11,
          userId: 1,
          clockIn: "2024-05-18T08:34:22.731923+03:00",
          clockOut: "2024-05-18T18:35:26.241943+03:00",
          status: "On Time",
          date:"2024-05-16T22:35:26.241943+03:00",
          break:"00:30 Min",
          workingHours: "09:02 Hrs"
        },
      ],
      leave: [
        {
          id: 10,
          userId: 1,
          requestDate: "2024-05-16T13:34:22.731923+03:00",
          startDate: "2024-06-17T13:34:22.731923+03:00",
          endDate: "2024-07-16T13:34:22.731923+03:00",
          ManagerUrl: "/api/user/employee/3",
          totalLeaveDays: 22,
          leaveBalance: 21,
        },
      ],
    },
    {
      url: "/api/user/employee/2",
      id: 2,
      firstName: "Akemini",
      image: kkk,
      lastName: "Arinitwe",
      middleName: "Bonny",
      profile: [
        {
          employeeId: "OASIS-0002",
          nextOfKin: "Fuuto",
          gender: "male",
          Company: "Tea Estate Company",
          username: "random_guess",
          mobileNumber: "1234567890",
          email: "janed@yahoo.com",
          workEmail: "janed@campany.com",
          birthDate: "2019-02-02",
          maritalStatus: "Divorced",
          nationality: "Alien",
          homeAddress: "2617 South Robinson Avenue, Oklahoma City",
          city: "Nairobi",
          district: "Kairo",
          zipCode: "0345",
          department: "Design",
          designation: "UI/UX Designer",
          employeeType: "Onsite",
          contractType: "Permanent",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          hireDate: "2011-12-22",
          officeLocation: "Uganda",
          socialAccounts: {
            slackId: "1234567890",
            twitterId: "@janedElone",
            skypeId: "GoodYesu",
            githubId: "@rayJane",
          },
          bankBranch: "Axis Bank/Gachibowli",
          bankAccountNumber: "1234567890",
          accountName: "Janed-Elone",
          isManager: false,
        },
      ],
      attendance: [
        {
          id: 2,
          userId: 2,
          clockIn: "2024-05-16T13:34:22.731923+03:00",
          clockOut: "2024-05-16T22:35:26.241943+03:00",
          status: "On Time",
          date:"2024-05-16T22:35:26.241943+03:00",
          break:"00:30 Min",
          workingHours: "09:02 Hrs"
        },
        {
          id: 6,
          userId: 2,
          clockIn: "2024-05-17T12:34:22.731923+03:00",
          clockOut: "2024-05-17T23:35:26.241943+03:00",
          status: "On Time",
          date:"2024-05-16T22:35:26.241943+03:00",
          break:"00:30 Min",
          workingHours: "09:02 Hrs"
        },
        {
          id: 4,
          userId: 2,
          clockIn: "2024-05-18T08:34:22.731923+03:00",
          clockOut: "2024-05-18T18:35:26.241943+03:00",
          status: "On Time",
          date:"2024-05-16T22:35:26.241943+03:00",
          break:"00:30 Min",
          workingHours: "09:02 Hrs"
        },
      ],
      leave: [
        {
          id: 9,
          userId: 2,
          requestDate: "2024-05-16T13:34:22.731923+03:00",
          startDate: "2024-06-17T13:34:22.731923+03:00",
          endDate: "2024-07-16T13:34:22.731923+03:00",
          ManagerUrl: "/api/user/employee/3",
          totalLeaveDays: 22,
          leaveBalance: 9,
        },
        {
          id: 20,
          userId: 2,
          requestDate: "2024-05-16T13:34:22.731923+03:00",
          startDate: "2024-06-17T13:34:22.731923+03:00",
          endDate: "2024-07-16T13:34:22.731923+03:00",
          ManagerUrl: "/api/user/employee/3",
          totalLeaveDays: 22,
          leaveBalance: 5,
        },
      ],
    },
    {
      url: "/api/user/employee/3",
      id: 3,
      firstName: "Kasito",
      image: kasito,
      lastName: "Jovan",
      middleName: "",
      profile: [
        {
          employeeId: "OASIS-0003",
          nextOfKin: "bomber",
          gender: "male",
          Company: "Tea Estate Company",
          username: "random_guess",
          mobileNumber: "1234567890",
          email: "janed@yahoo.com",
          workEmail: "janed@campany.com",
          birthDate: "2019-02-02",
          maritalStatus: "Divorced",
          nationality: "Alien",
          homeAddress: "2617 South Robinson Avenue, Oklahoma City",
          city: "Nairobi",
          district: "Kairo",
          zipCode: "0345",
          department: "Design",
          designation: "UI/UX Designer",
          employeeType: "Onsite",
          contractType: "Permanent",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          hireDate: "2019-02-02",
          officeLocation: "America",
          socialAccounts: {
            slackId: "1234567890",
            twitterId: "@janedElone",
            skypeId: "GoodYesu",
            githubId: "@rayJane",
          },
          bankBranch: "Axis Bank/Gachibowli",
          bankAccountNumber: "1234567890",
          accountName: "Yes",
          isManager: true,
        },
      ],
      attendance: [
        {
          id: 5,
          userId: 3,
          clockIn: "2024-05-16T13:34:22.731923+03:00",
          clockOut: "2024-05-16T22:35:26.241943+03:00",
          status: "On Time",
          date:"2024-05-16T22:35:26.241943+03:00",
          break:"00:30 Min",
          workingHours: "09:02 Hrs"
        },
        {
          id: 9,
          userId: 3,
          clockIn: "2024-05-17T12:34:22.731923+03:00",
          clockOut: "2024-05-17T23:35:26.241943+03:00",
          status: "On Time",
          date:"2024-05-16T22:35:26.241943+03:00",
          break:"00:30 Min",
          workingHours: "09:02 Hrs"
        },
        {
          id: 11,
          userId: 3,
          clockIn: "2024-05-18T08:34:22.731923+03:00",
          clockOut: "2024-05-18T18:35:26.241943+03:00",
          status: "On Time",
          date:"2024-05-16T22:35:26.241943+03:00",
          break:"00:30 Min",
          workingHours: "09:02 Hrs"
        },
      ],
      leave: [
        {
          id: 10,
          userId: 3,
          requestDate: "2024-05-16T13:34:22.731923+03:00",
          startDate: "2024-06-17T13:34:22.731923+03:00",
          endDate: "2024-07-16T13:34:22.731923+03:00",
          ManagerUrl: "/api/user/employee/3",
          totalLeaveDays: 22,
          leaveBalance: 5,
        },
      ],
    },
    {
      url: "/api/user/employee/4",
      id: 4,
      firstName: "Joseph",
      image: joe,
      lastName: "Erumu",
      middleName: "Igbako",
      profile: [
        {
          employeeId: "OASIS-0004",
          nextOfKin: "Kemi",
          gender: "male",
          Company: "Tea Estate Company",
          username: "random_guess",
          mobileNumber: "1234567890",
          email: "joee@yahoo.com",
          workEmail: "jaoee@campany.com",
          birthDate: "2019-02-02",
          maritalStatus: "Divorced",
          nationality: "Alien",
          homeAddress: "2617 South Robinson Avenue, Oklahoma City",
          city: "Nairobi",
          district: "Kairo",
          zipCode: "0345",
          department: "Engineering",
          designation: "Backend Engineer",
          employeeType: "Remote",
          contractType: "Permanent",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          hireDate: "2019-02-02",
          officeLocation: "America",
          socialAccounts: {
            slackId: "1234567890",
            twitterId: "@janedElone",
            skypeId: "GoodYesu",
            githubId: "@rayJane",
          },
          bankBranch: "Axis Bank/Gachibowli",
          bankAccountNumber: "1234567890",
          accountName: "Joseph-Igbako",
          isManager: false,
        },
      ],
      attendance: [
        {
          id: 5,
          userId: 4,
          clockIn: "2024-05-16T13:34:22.731923+03:00",
          clockOut: "2024-05-16T22:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 9,
          userId: 4,
          clockIn: "2024-05-17T12:34:22.731923+03:00",
          clockOut: "2024-05-17T23:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 11,
          userId: 4,
          clockIn: "2024-05-18T08:34:22.731923+03:00",
          clockOut: "2024-05-18T18:35:26.241943+03:00",
          status: "On Time",
        },
      ],
      leave: [
        {
          id: 10,
          userId: 4,
          requestDate: "2024-05-16T13:34:22.731923+03:00",
          startDate: "2024-06-17T13:34:22.731923+03:00",
          endDate: "2024-07-16T13:34:22.731923+03:00",
          ManagerUrl: "/api/user/employee/3",
          totalLeaveDays: 22,
          leaveBalance: 21,
        },
      ],
    },
    {
      url: "/api/user/employee/5",
      id: 5,
      firstName: "Jack",
      image: jack,
      lastName: "Freeman",
      middleName: "Ude",
      profile: [
        {
          employeeId: "OASIS-0005",
          nextOfKin: "Simi",
          gender: "male",
          Company: "Tea Estate Company",
          username: "random_guess",
          mobileNumber: "1234567890",
          email: "jackfree@yahoo.com",
          workEmail: "jackfree@campany.com",
          birthDate: "2019-02-02",
          maritalStatus: "Married",
          nationality: "Alien",
          homeAddress: "2617 South Robinson Avenue, Oklahoma City",
          city: "Nairobi",
          district: "Kairo",
          zipCode: "0345",
          department: "Engineering",
          designation: "Backend Engineer",
          employeeType: "Remote",
          contractType: "Permanent",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          hireDate: "2019-02-02",
          officeLocation: "America",
          socialAccounts: {
            slackId: "1234567890",
            twitterId: "@freejack",
            skypeId: "GoodYesu",
            githubId: "@rayJane",
          },
          bankBranch: "Axis Bank/Gachibowli",
          bankAccountNumber: "1234567890",
          accountName: "jack-free",
          isManager: false,
        },
      ],
      attendance: [
        {
          id: 5,
          userId: 5,
          clockIn: "2024-05-16T13:34:22.731923+03:00",
          clockOut: "2024-05-16T22:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 9,
          userId: 5,
          clockIn: "2024-05-17T12:34:22.731923+03:00",
          clockOut: "2024-05-17T23:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 11,
          userId: 5,
          clockIn: "2024-05-18T08:34:22.731923+03:00",
          clockOut: "2024-05-18T18:35:26.241943+03:00",
          status: "On Time",
        },
      ],
      leave: [
        {
          id: 10,
          userId: 5,
          requestDate: "2024-05-16T13:34:22.731923+03:00",
          startDate: "2024-06-17T13:34:22.731923+03:00",
          endDate: "2024-07-16T13:34:22.731923+03:00",
          ManagerUrl: "/api/user/employee/3",
          totalLeaveDays: 22,
          leaveBalance: 21,
        },
      ],
    },
    {
      url: "/api/user/employee/6",
      id: 6,
      firstName: "Victor",
      image: victor,
      lastName: "Jude",
      middleName: "Michael",
      profile: [
        {
          employeeId: "OASIS-0006",
          nextOfKin: "Gary",
          gender: "male",
          Company: "Tea Estate Company",
          username: "random_guess",
          mobileNumber: "1234567890",
          email: "vicmic@yahoo.com",
          workEmail: "vicmic@campany.com",
          birthDate: "2019-02-02",
          maritalStatus: "Single",
          nationality: "Alien",
          homeAddress: "2617 South Robinson Avenue, Oklahoma City",
          city: "Nairobi",
          district: "Kairo",
          zipCode: "0345",
          department: "Engineering",
          designation: "Frontend Engineer",
          employeeType: "Onsite",
          contractType: "Permanent",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          hireDate: "2019-02-02",
          officeLocation: "America",
          socialAccounts: {
            slackId: "1234567890",
            twitterId: "@janedElone",
            skypeId: "GoodYesu",
            githubId: "@rayJane",
          },
          bankBranch: "Axis Bank/Gachibowli",
          bankAccountNumber: "1234567890",
          accountName: "Victor-Michael",
          isManager: false,
        },
      ],
      attendance: [
        {
          id: 5,
          userId: 6,
          clockIn: "2024-05-16T13:34:22.731923+03:00",
          clockOut: "2024-05-16T22:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 9,
          userId: 6,
          clockIn: "2024-05-17T12:34:22.731923+03:00",
          clockOut: "2024-05-17T23:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 11,
          userId: 6,
          clockIn: "2024-05-18T08:34:22.731923+03:00",
          clockOut: "2024-05-18T18:35:26.241943+03:00",
          status: "On Time",
        },
      ],
      leave: [
        {
          id: 10,
          userId: 6,
          requestDate: "2024-05-16T13:34:22.731923+03:00",
          startDate: "2024-06-17T13:34:22.731923+03:00",
          endDate: "2024-07-16T13:34:22.731923+03:00",
          ManagerUrl: "/api/user/employee/3",
          totalLeaveDays: 22,
          leaveBalance: 21,
        },
      ],
    },
    {
      url: "/api/user/employee/7",
      id: 7,
      firstName: "Julia",
      image: julia,
      lastName: "Elena",
      middleName: "Monty",
      profile: [
        {
          employeeId: "OASIS-0007",
          nextOfKin: "Akemini",
          gender: "female",
          Company: "Tea Estate Company",
          username: "random_guess",
          mobileNumber: "1234567890",
          email: "juliamonty@yahoo.com",
          workEmail: "juliamonty@campany.com",
          birthDate: "2019-02-02",
          maritalStatus: "Single",
          nationality: "Alien",
          homeAddress: "2617 South Robinson Avenue, Oklahoma City",
          city: "Nairobi",
          district: "Kairo",
          zipCode: "0345",
          department: "Engineering",
          designation: "Frontend Engineer",
          employeeType: "Remote",
          contractType: "Contract",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          hireDate: "2019-02-02",
          officeLocation: "America",
          socialAccounts: {
            slackId: "1234567890",
            twitterId: "@juliamonty",
            skypeId: "GoodYesu",
            githubId: "@rayJane",
          },
          bankBranch: "Axis Bank/Gachibowli",
          bankAccountNumber: "1234567890",
          accountName: "Julia-Monty",
          isManager: false,
        },
      ],
      attendance: [
        {
          id: 5,
          userId: 7,
          clockIn: "2024-05-16T13:34:22.731923+03:00",
          clockOut: "2024-05-16T22:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 9,
          userId: 7,
          clockIn: "2024-05-17T12:34:22.731923+03:00",
          clockOut: "2024-05-17T23:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 11,
          userId: 7,
          clockIn: "2024-05-18T08:34:22.731923+03:00",
          clockOut: "2024-05-18T18:35:26.241943+03:00",
          status: "On Time",
        },
      ],
      leave: [
        {
          id: 10,
          userId: 7,
          requestDate: "2024-05-16T13:34:22.731923+03:00",
          startDate: "2024-06-17T13:34:22.731923+03:00",
          endDate: "2024-07-16T13:34:22.731923+03:00",
          ManagerUrl: "/api/user/employee/3",
          totalLeaveDays: 22,
          leaveBalance: 21,
        },
      ],
    },
    {
      url: "/api/user/employee/8",
      id: 8,
      firstName: "Raphael",
      image: ralph,
      lastName: "Miller",
      middleName: "Ekong",
      profile: [
        {
          employeeId: "OASIS-0008",
          nextOfKin: "Ifunaya",
          gender: "male",
          Company: "Tea Estate Company",
          username: "random_guess",
          mobileNumber: "1234567890",
          email: "ralphmiller@yahoo.com",
          workEmail: "ralphmiller@campany.com",
          birthDate: "2019-02-02",
          maritalStatus: "Married",
          nationality: "Alien",
          homeAddress: "2617 South Robinson Avenue, Oklahoma City",
          city: "Nairobi",
          district: "Kairo",
          zipCode: "0345",
          department: "Engineering",
          designation: "Frontend Engineer",
          employeeType: "Remote",
          contractType: "Permanent",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          hireDate: "2019-02-02",
          officeLocation: "America",
          socialAccounts: {
            slackId: "1234567890",
            twitterId: "@ralphmiller",
            skypeId: "GoodYesu",
            githubId: "@ralphmiller",
          },
          bankBranch: "Axis Bank/Gachibowli",
          bankAccountNumber: "1234567890",
          accountName: "Ralph-Miller",
          isManager: false,
        },
      ],
      attendance: [
        {
          id: 5,
          userId: 8,
          clockIn: "2024-05-16T13:34:22.731923+03:00",
          clockOut: "2024-05-16T22:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 9,
          userId: 8,
          clockIn: "2024-05-17T12:34:22.731923+03:00",
          clockOut: "2024-05-17T23:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 11,
          userId: 8,
          clockIn: "2024-05-18T08:34:22.731923+03:00",
          clockOut: "2024-05-18T18:35:26.241943+03:00",
          status: "On Time",
        },
      ],
      leave: [
        {
          id: 10,
          userId: 8,
          requestDate: "2024-05-16T13:34:22.731923+03:00",
          startDate: "2024-06-17T13:34:22.731923+03:00",
          endDate: "2024-07-16T13:34:22.731923+03:00",
          ManagerUrl: "/api/user/employee/3",
          totalLeaveDays: 22,
          leaveBalance: 21,
        },
      ],
    },
    {
      url: "/api/user/employee/9",
      id: 9,
      firstName: "Rick",
      image: rick,
      lastName: "Doe",
      middleName: "Cullen",
      profile: [
        {
          employeeId: "OASIS-0009",
          nextOfKin: "Bayo",
          gender: "male",
          Company: "Tea Estate Company",
          username: "random_guess",
          mobileNumber: "1234567890",
          email: "rickcull@yahoo.com",
          workEmail: "rickcull@campany.com",
          birthDate: "2019-02-02",
          maritalStatus: "Single",
          nationality: "Alien",
          homeAddress: "2617 South Robinson Avenue, Oklahoma City",
          city: "Nairobi",
          district: "Kairo",
          zipCode: "0345",
          department: "Marketing",
          designation: "Product Manager",
          employeeType: "Onsite",
          contractType: "Permanent",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          hireDate: "2019-02-02",
          officeLocation: "America",
          socialAccounts: {
            slackId: "1234567890",
            twitterId: "@rickCull",
            skypeId: "GoodYesu",
            githubId: "@rayJane",
          },
          bankBranch: "Axis Bank/Gachibowli",
          bankAccountNumber: "1234567890",
          accountName: "Rick-Cull",
          isManager: false,
        },
      ],
      attendance: [
        {
          id: 5,
          userId: 9,
          clockIn: "2024-05-16T13:34:22.731923+03:00",
          clockOut: "2024-05-16T22:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 9,
          userId: 9,
          clockIn: "2024-05-17T12:34:22.731923+03:00",
          clockOut: "2024-05-17T23:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 11,
          userId: 9,
          clockIn: "2024-05-18T08:34:22.731923+03:00",
          clockOut: "2024-05-18T18:35:26.241943+03:00",
          status: "On Time",
        },
      ],
      leave: [
        {
          id: 10,
          userId: 9,
          requestDate: "2024-05-16T13:34:22.731923+03:00",
          startDate: "2024-06-17T13:34:22.731923+03:00",
          endDate: "2024-07-16T13:34:22.731923+03:00",
          ManagerUrl: "/api/user/employee/3",
          totalLeaveDays: 22,
          leaveBalance: 21,
        },
      ],
    },
    {
      url: "/api/user/employee/10",
      id: 10,
      firstName: "Esther",
      image: esty,
      lastName: "Okon",
      middleName: "Ebong",
      profile: [
        {
          employeeId: "OASIS-0010",
          nextOfKin: "John",
          gender: "female",
          Company: "Tea Estate Company",
          username: "random_guess",
          mobileNumber: "1234567890",
          email: "estyokon@yahoo.com",
          workEmail: "estyokon@campany.com",
          birthDate: "2019-02-02",
          maritalStatus: "Single",
          nationality: "Alien",
          homeAddress: "2617 South Robinson Avenue, Oklahoma City",
          city: "Nairobi",
          district: "Kairo",
          zipCode: "0345",
          department: "Marketing",
          designation: "Product Manager",
          employeeType: "Onsite",
          contractType: "Permanent",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          hireDate: "2019-02-02",
          officeLocation: "America",
          socialAccounts: {
            slackId: "1234567890",
            twitterId: "@janedElone",
            skypeId: "GoodYesu",
            githubId: "@rayJane",
          },
          bankBranch: "Axis Bank/Gachibowli",
          bankAccountNumber: "1234567890",
          accountName: "Esty-Okon",
          isManager: false,
        },
      ],
      attendance: [
        {
          id: 5,
          userId: 10,
          clockIn: "2024-05-16T13:34:22.731923+03:00",
          clockOut: "2024-05-16T22:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 9,
          userId: 10,
          clockIn: "2024-05-17T12:34:22.731923+03:00",
          clockOut: "2024-05-17T23:35:26.241943+03:00",
          status: "On Time",
        },
        {
          id: 11,
          userId: 10,
          clockIn: "2024-05-18T08:34:22.731923+03:00",
          clockOut: "2024-05-18T18:35:26.241943+03:00",
          status: "On Time",
        },
      ],
      leave: [
        {
          id: 10,
          userId: 10,
          requestDate: "2024-05-16T13:34:22.731923+03:00",
          startDate: "2024-06-17T13:34:22.731923+03:00",
          endDate: "2024-07-16T13:34:22.731923+03:00",
          ManagerUrl: "/api/user/employee/3",
          totalLeaveDays: 22,
          leaveBalance: 21,
        },
      ],
    },
  ],
};

export const allAttendance = {
  attendance: [
    {
      id: 5,
      userId: 1,
      clockIn: "2024-05-16T13:34:22.731923+03:00",
      clockOut: "2024-05-16T22:35:26.241943+03:00",
      status: "On Time",
      designation: "UI/UX Designer",
      firstName: "Jane",
      lastName: "Doe",
      middleName: "Yusuf",
      type: "Office",
    },
    {
      id: 9,
      userId: 1,
      clockIn: "2024-05-17T12:34:22.731923+03:00",
      clockOut: "2024-05-17T23:35:26.241943+03:00",
      status: "Late",
      designation: "UI/UX Designer",
      firstName: "Naima",
      lastName: "Alabi",
      middleName: "Abbie",
      type: "Remote",
    },
    {
      id: 11,
      userId: 1,
      clockIn: "2024-05-18T08:34:22.731923+03:00",
      clockOut: "2024-05-18T18:35:26.241943+03:00",
      status: "On Time",
      designation: "UI/UX Designer",
      firstName: "Rahma",
      lastName: "Said",
      middleName: "Yusuf",
      type: "Office",
    },
  ],
};

const hr = {
  firstName: "Raymond",
  lastName: "Downey",
  loginKey: "hr@hrm.com",
  password: "raymond1234",
  designation: "HR Manager",
};

const isAuthenticated = async (request) => {
  return request.password === hr.password && request.loginKey === hr.loginKey;
};

export const handlers = [
  http.get("/api/posts", () => {
    return HttpResponse.json({
      data: 'Captured a "GET /posts" request',
    });
  }),
  http.get("/api/user/employees", () => {
    return HttpResponse.json(allEmployees);
  }),
  http.get("/api/user/attendance", () => {
    return HttpResponse.json({
      count: allAttendance.attendance.length,
      createdAt: Date.now(),
      results: allAttendance,
    });
  }),

  http.post("/api/hr/login", async ({ request }) => {
    const newtext = await request.json();
    const authenticated = await isAuthenticated(newtext);

    if (authenticated) {
      return HttpResponse.json({
        status: 200,
        message: "login succcessfull",
        hr,
      });
    } else {
      return HttpResponse.json({
        status: 401,
        message: "check email and password and try again",
      });
    }
  }),

  http.get("/api/user/employees/:id", ({ params }) => {
    const { id } = params;
    const userArray = allEmployees.results.filter((item) => item.id == id);
    if (userArray.length > 0) {
      return HttpResponse.json(userArray[0]);
    } else {
      //
    }
  }),
];