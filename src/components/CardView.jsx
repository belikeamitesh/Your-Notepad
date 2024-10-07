import React, { useState } from "react";
import { TrashIcon, PencilIcon, ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

const CardView = ({ content, deleteContent, editContent }) => {
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedText(text);
        setTimeout(() => setCopiedText(""), 2000);
      },
      (err) => console.error("Failed to copy text: ", err)
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mt-6">
      {Object.keys(content).map((key) => (
        <div
          key={key}
          className="relative bg-white shadow-lg rounded-lg p-6 border transform transition-transform duration-300 hover:scale-105 hover:shadow-xl h-auto min-h-[300px] flex flex-col justify-between"
        >
          {copiedText === key || copiedText === content[key] ? (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-600 px-2 py-1 rounded-md text-xs">
              <CheckIcon className="inline-block h-4 w-4 mr-1" />
              <span>Copied!</span>
            </div>
          ) : null}

          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{key}</h3>
            <button
              onClick={() => copyToClipboard(key)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ClipboardIcon className="h-5 w-5" />
              <span className="sr-only">Copy Key</span>
            </button>
          </div>

          <div className="flex items-start justify-between mb-4">
            <p className="text-gray-600 text-sm break-words max-h-16 overflow-hidden overflow-ellipsis">
              {content[key]}
            </p>
            <button
              onClick={() => copyToClipboard(content[key])}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ClipboardIcon className="h-5 w-5" />
              <span className="sr-only">Copy Value</span>
            </button>
          </div>

          <div className="flex justify-between mt-4 pt-2 border-t">
            <button
              className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 transition-colors"
              onClick={() => editContent(key)}
            >
              <PencilIcon className="h-5 w-5" />
              <span>Edit</span>
            </button>
            <button
              className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors"
              onClick={() => deleteContent(key)}
            >
              <TrashIcon className="h-5 w-5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;
