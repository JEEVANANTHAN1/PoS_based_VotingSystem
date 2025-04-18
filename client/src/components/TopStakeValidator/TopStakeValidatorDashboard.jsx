import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TopStakeValidatorDashboard.module.css";

const TopStakeValidatorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Top Stake Validator Dashboard</h1>

      <div className={styles.buttonGroup}>
        <button className={styles.addButton} onClick={() => navigate("/topstake/add-candidate")}>
          Add Candidate
        </button>

        <button className={styles.phaseButton} onClick={() => navigate("/topstake/phase-control")}>
          Manage Election Phase
        </button>

        <button className={styles.logoutButton} onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopStakeValidatorDashboard;
