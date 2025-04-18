import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import web3 from "../../utils/web3";
import styles from "./UserLogin.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const accounts = await web3.eth.requestAccounts();
      const userAddress = accounts[0];

      const storedEmail = localStorage.getItem("userEmail");
      const storedPassword = localStorage.getItem("userPassword");
      const storedAddress = localStorage.getItem("userAddress");

      if (
        email === storedEmail &&
        password === storedPassword &&
        userAddress === storedAddress
      ) {
        console.log("Login successful");
        navigate("/dashboard");
      } else {
        alert("Invalid credentials or wallet mismatch");
      }
    } catch (err) {
      alert("MetaMask not connected");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>User Login</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <input
            className={styles.input}
            type="email"
            placeholder=" Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder=" Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.button} type="submit">
             Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
