import React from "react";
import MovieChart from "./MovieChart";
import HotelChart from "./HotelChart";

const Chart = ({ type = "" }) => {
  if (!type) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-600">Please select a valid chart type.</p>
      </div>
    );
  }

  let ComponentToRender;

  const typeLower = type.toLowerCase();

  if (typeLower.includes("movie")) {
    ComponentToRender = MovieChart;
  } else if (typeLower.includes("hotel")) {
    ComponentToRender = HotelChart;
  } else {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-600">Invalid chart type provided.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full"> {/* Takes full height of parent */}
      <ComponentToRender />
    </div>
  );
};

export default Chart;