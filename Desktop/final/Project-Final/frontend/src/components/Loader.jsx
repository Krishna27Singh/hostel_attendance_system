import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-500 border-opacity-75"></div>
    </div>
  );
};

export default Loader;
