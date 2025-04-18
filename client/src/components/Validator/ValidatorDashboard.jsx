import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ValidatorDashboard.module.css";

const ValidatorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("validatorAddress");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Validator Dashboard</h1>

      <div className={styles.buttons}>
        <button onClick={() => navigate("/validator/approve-requests")} className={styles.button}>
          Approve Voter Registrations
        </button>

        <button onClick={handleLogout} className={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ValidatorDashboard;
