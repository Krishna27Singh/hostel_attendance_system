import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App";
import "./index.css";
import 'react-toastify/ReactToastify.css';
import 'leaflet/dist/leaflet.css';
 

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ✅ Router is only here! */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);




