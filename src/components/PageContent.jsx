import React, { useState } from "react";
import TableView from "./TableView";

const PageContent = ({ currentPage, pages, setPages }) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Here is your saved list for {currentPage}</h2>

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

      <TableView
        content={pages[currentPage]}
        deleteContent={deleteContent}
        editContent={editContent}
      />
    </div>
  );
};

export default PageContent;