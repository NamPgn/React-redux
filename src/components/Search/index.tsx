import React, { useState } from "react";
const SearchResults = ({ data }: any) => {
  const [showResults, setShowResults] = useState(true);

  return data.length > 0 ? (
    <div className="absolute top-[50px] left-0 w-full flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
      <div className="p-4 flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        {data.map((item, index:number) => (
          <a href={`/q/${item._id}`} key={item._id}>
            <div
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              {item.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SearchResults;
