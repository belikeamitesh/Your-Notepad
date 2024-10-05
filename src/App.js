import React, { useState, useEffect } from "react";
import AddPage from "./components/AddPage";
import PageContent from "./components/PageContent";

const App = () => {
  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem("pages");
    return saved ? JSON.parse(saved) : {};
  });

  const [currentPage, setCurrentPage] = useState(Object.keys(pages)[0] || "");

  useEffect(() => {
    localStorage.setItem("pages", JSON.stringify(pages));
  }, [pages]);

  const deletePage = (pageName) => {
    const updatedPages = { ...pages };
    delete updatedPages[pageName];
    setPages(updatedPages);
    if (currentPage === pageName) {
      setCurrentPage(Object.keys(updatedPages)[0] || null); // Set to the first page if available
    }
  };

  const handlePageChange = (event) => {
    setCurrentPage(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Your-Notepad</h1>
        
        <AddPage setPages={setPages} pages={pages} setCurrentPage={setCurrentPage} />

        <div className="mb-4 flex justify-center">
          <select 
            value={currentPage} 
            onChange={handlePageChange} 
            className="border rounded-md p-2 w-80" 
          >
            <option value="" disabled>Select a page</option>
            {Object.keys(pages).map((page) => (
              <option key={page} value={page}>{page}</option>
            ))}
          </select>
        </div>

        {/* Render Page Content if a page is selected */}
        {currentPage && (
          <div>
            <PageContent
              currentPage={currentPage}
              pages={pages}
              setPages={setPages}
            />
            <button
              onClick={() => deletePage(currentPage)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;