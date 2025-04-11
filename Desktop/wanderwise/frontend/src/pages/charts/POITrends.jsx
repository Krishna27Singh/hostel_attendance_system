import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const cache = {};

const POITrends = ({ cityA, cityB }) => {
    const [trendData, setTrendData] = useState([]);
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Backend URL:", backendUrl); // Debugging
    
    useEffect(() => {
        const key = `${cityA}_${cityB}`;
    
        if (!backendUrl) {
            console.error("Backend URL is not defined in .env file.");
            return;
        }
    
        // Check if we already have cached data
        if (cache[key]) {
            setTrendData(cache[key]);
            return;
        }
    
        fetch(`${backendUrl}/trends?cityA=${cityA}&cityB=${cityB}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                } else {
                    const formattedData = data.dates.map((date, index) => ({
                        date: date,
                        [cityA]: data.cityA[index],
                        [cityB]: data.cityB[index],
                    }));
    
                    cache[key] = formattedData;
                    setTrendData(formattedData);
                }
            })
            .catch(error => console.error("Error fetching trends:", error));
    }, [cityA, cityB, backendUrl]);
    
    return (
        <div className="p-4 bg-white shadow-lg rounded-xl" id="trend">
            <h2 className="text-xl font-semibold mb-4"> Travel Trend Comparison: {cityA} vs {cityB}</h2>
            <ResponsiveContainer width="100%" height={300}  >.

                <LineChart data={trendData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey={cityA} stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey={cityB} stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default POITrends;
