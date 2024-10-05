import React, { useState } from "react";

const PageList = ({ pages, setCurrentPage, currentPage, deletePage }) => {
  const [openPage, setOpenPage] = useState(null);

  const handlePageClick = (page) => {
    if (openPage === page) {
      setOpenPage(null); 
      setCurrentPage(null); 
    } else {
      setOpenPage(page); 
      setCurrentPage(page); 
    }
  };

  return (
    <div>
        <h2 className="text-xl font-semibold">Pages</h2>
      <div className="mt-4 grid grid-cols-3 gap-4"> 
        {Object.keys(pages).map((page) => (
          <div key={page} className="flex items-center justify-between mb-2">
            <button
              className={`w-full text-left p-2 rounded-md ${
                openPage === page
                  ? "bg-blue-400 text-white"
                  : "bg-blue-200 hover:bg-blue-300"
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md ml-2"
              onClick={() => deletePage(page)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageList;