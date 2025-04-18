import React ,  { useEffect } from "react";
import { Route, Routes , useNavigate} from "react-router-dom";



import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
// import { GeneralContextProvider } from "./GeneralContext";


const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login"); // User logged in nahi hai, to login page pe bhej do
    }
  }, []);
  return (
   
      <div className="dashboard-container">
        <WatchList />
        
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
          </Routes>
        </div>
      </div>
  );
};

export default Dashboard;
