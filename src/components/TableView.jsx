import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const TableView = ({ content, deleteContent, editContent }) => {
  return (
    <div className="border rounded-md">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border p-2">Key</th>
            <th className="border p-2">Value</th>
            <th className="border p-2">Edit Value</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(content).map((key) => (
            <tr key={key}>
              <td className="border p-2">{key}</td>
              <td className="border p-2">{content[key]}</td>
              <td className="border p-2 text-center">
                <button onClick={() => editContent(key)}>
                  <PencilIcon className="h-5 w-5 bold text-blue-500" />
                </button>
              </td>
              <td className="border p-2 text-center space-x-2">
                <button onClick={() => deleteContent(key)}>
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
