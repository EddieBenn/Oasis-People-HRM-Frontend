import React from "react";

const Status = ({ status }) => {
  return (
    <div
      className={`w-fit py-2.5 px-3 font-light text-xs font-lexend rounded-md ${
        status === "On Time"
          ? "bg-[#3FC28A1A] text-[#3FC28A]"
          : "bg-[#F45B691A] text-[#F45B69]"
      }`}
    >
      {status}
    </div>
  );
};

export default Status;
