import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import web3 from "../../utils/web3";
import styles from "./UserSignup.module.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const accounts = await web3.eth.requestAccounts();
      const userAddress = accounts[0];

      localStorage.setItem("username", username);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("userAddress", userAddress);

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert("MetaMask not connected");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>User Signup</h1>
        <form onSubmit={handleSignup} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
