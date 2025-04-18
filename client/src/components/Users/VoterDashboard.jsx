import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VoterDashboard.module.css";

const VoterDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>User Dashboard</h1>

        <div className={styles.buttonGroup}>
          <button onClick={() => navigate("/register-voter")} className={`${styles.button} ${styles.green}`}>
            📝 Voter Registration
          </button>

          <button onClick={() => navigate("/voting")} className={`${styles.button} ${styles.indigo}`}>
            🗳️ Voting Area
          </button>

          <button onClick={() => navigate("/results")} className={`${styles.button} ${styles.yellow}`}>
            📊 View Results
          </button>

          <button onClick={handleLogout} className={`${styles.button} ${styles.red}`}>
            🔓 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoterDashboard;
