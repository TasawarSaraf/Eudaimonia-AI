import React from "react";
import useGoogleFitData from "../hooks/useGoogleFitData"; // Adjust the import path as needed
import { useLocation } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

const Dashboard = () => {
  const { user, token } = useUser();
  console.log(user, token);
  const { fitData, loading, error } = useGoogleFitData(token);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Hello World</h1>
      <h1>{user.displayName}</h1>
      {/* Render your Google Fit data here */}
    </div>
  );
};

export default Dashboard;
