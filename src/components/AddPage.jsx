import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline"; 

const AddPage = ({ setPages, pages, setCurrentPage }) => {
  const [newPageName, setNewPageName] = useState("");

  const handleAddPage = () => {
    if (newPageName.trim() && !pages[newPageName]) {
      setPages((prev) => ({ ...prev, [newPageName]: {} }));
      setCurrentPage(newPageName); // Set current page to the new page
      setNewPageName(""); // Reset input
    } else {
      alert("Page name is required and must be unique.");
    }
  };

  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        value={newPageName}
        onChange={(e) => setNewPageName(e.target.value)}
        placeholder="New Page Name"
        className="border p-1 rounded-md mr-2 w-48"
      />
      <button
        onClick={handleAddPage}
        className="bg-blue-500 text-white rounded-md p-1"
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AddPage;
