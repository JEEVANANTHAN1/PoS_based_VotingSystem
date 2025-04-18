import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["home-container"]}>
      <div className={styles.card}>
        <h1 className={styles["home-title"]}>PoS Voting System</h1>
        <h2 style={{ color: "lightgray", marginBottom: "2rem" }}>
          A Secure Proof-of-Stake blockchain voting platform
        </h2>
        <div className={styles["button-group"]}>
          <button
            onClick={() => navigate("/signup")}
            className={`${styles["home-button"]} ${styles["signup-btn"]}`}
          >
            📝 User Signup
          </button>

          <button
            onClick={() => navigate("/login")}
            className={`${styles["home-button"]} ${styles["login-btn"]}`}
          >
            🔑 User Login
          </button>

          <button
            onClick={() => navigate("/validator-login")}
            className={`${styles["home-button"]} ${styles["validator-btn"]}`}
          >
            🛡️ Validator Login
          </button>

          <button
            onClick={() => navigate("/topstake/dashboard")}
            className={`${styles["home-button"]} ${styles["topstake-btn"]}`}
          >
            🏆 Top-Stake Validator
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
