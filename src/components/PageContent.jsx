import React, { useState } from "react";
import CardView from "./CardView";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const PageContent = ({ currentPage, pages, setPages }) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  const addOrUpdateContent = () => {
    if (key.trim()) {
      const updatedPage = { ...pages[currentPage], [key]: value };
      setPages({ ...pages, [currentPage]: updatedPage });
      setKey("");
      setValue("");
      setIsEditing(false);
    }
  };

  const editContent = (keyToEdit) => {
    setKey(keyToEdit);
    setValue(pages[currentPage][keyToEdit]);
    setIsEditing(true);
  };

  const deleteContent = (keyToDelete) => {
    const updatedPage = { ...pages[currentPage] };
    delete updatedPage[keyToDelete];
    setPages({ ...pages, [currentPage]: updatedPage });
    setKey("");
    setValue("");
    setIsEditing(false);
  };

  const filteredContent = Object.keys(pages[currentPage] || {}).filter(
    (key) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()) || 
      pages[currentPage][key].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Here is your saved list for {currentPage}</h2>

      <div className="relative flex items-center mb-4 ml-auto" style={{ width: "240px" }}>
  <MagnifyingGlassIcon className="absolute left-2 h-5 w-5 text-gray-400" />
  <input
    className="border p-2 pl-10 w-full rounded-md focus:ring-2 focus:ring-blue-400"
    type="text"
    placeholder="Search by key or value..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

      <div className="flex mb-4">
        <input
          className="border p-1 mr-2 flex-grow rounded-md"
          type="text"
          placeholder="Key (e.g., Username, URL)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          disabled={isEditing}
        />
        <input
          className="border p-1 mr-2 flex-grow rounded-md"
          type="text"
          placeholder="Value (e.g., credentials, URL)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-2 py-1 rounded-md"
          onClick={addOrUpdateContent}
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>
      
      <CardView
        content={filteredContent.reduce((obj, key) => {
          obj[key] = pages[currentPage][key];
          return obj;
        }, {})}
        deleteContent={deleteContent}
        editContent={editContent}
      />
    </div>
  );
};

export default PageContent;
