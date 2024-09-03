import Layout from "../../components/Layout";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { TableSimple } from "../../components/TableSimple.jsx";
import SearchInput from "../../components/SearchInput";
import { useEffect, useState } from "react";
import { useEmployee } from "../../contexts/HrEmployeeContext.jsx";

const Employee = () => {
  const { allEmployees, getAllEmployees } = useEmployee();

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <Layout>
      <section className="border border-solid border-[#A2A1A833] rounded-[10px] p-5">
        <div className="flex items-center justify-between mb-6">
          <SearchInput />
          <div className="flex items-center gap-x-5">
            <Link to={`/add-employee`}>
              <Button icon={"plus-icon"}>Add New Employee</Button>
            </Link>
            <Button
              icon={"sort-icon"}
              className="!text-[#16151C] !bg-white !border !border-[#A2A1A833] rounded-[10px]"
            >
              Filter
            </Button>
          </div>
        </div>
        {allEmployees.length > 0 ? (
          <TableSimple employeesData={allEmployees} />
        ) : (
          <div className="italic font-light p-3 text-red-900">
            No data to display. You can add new employees by clicking the{" "}
            <span className="font-bold">Add New Employee</span> button above
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Employee;
