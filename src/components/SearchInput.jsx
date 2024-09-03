import React from "react";

const SearchInput = ({value, onChange}) => {
  return (
    <div className="flex items-center gap-x-5 border rounded-lg px-5 py-2 w-1/2">
        <span><img src="/icons/search-icon.svg" alt="" /></span>
      <input
        placeholder="Search"
        className="border-transparent outline-0 w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
