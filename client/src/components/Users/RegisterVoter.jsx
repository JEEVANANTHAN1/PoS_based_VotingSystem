import React, { useState } from "react";
import axios from "axios";
import styles from "./RegisterVoter.module.css";
import { requestAccount, registerVoter } from "../../utils/contractMethods";

const RegisterVoter = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [blockchainAddress, setBlockchainAddress] = useState("");

  const checkEligibility = async () => {
    try {
      const res = await axios.post("http://localhost:5000/check-eligibility", {
        aadhaar,
      });
      return res.data.email;
    } catch (err) {
      alert(err.response?.data?.message || "Eligibility check failed");
      return false;
    }
  };

  const handleRegister = async (e) => {
    console.log(localStorage);
    e.preventDefault();

    if (!aadhaar || !blockchainAddress) {
      alert("Please fill all fields.");
      return;
    }

    const isEligible = await checkEligibility();
    if (!isEligible) return;
    const email = isEligible;

    try {
      const currentAddress = await requestAccount();

      if (currentAddress.toLowerCase() !== blockchainAddress.toLowerCase()) {
        alert("Connected wallet doesn't match entered blockchain address.");
        return;
      }

      await registerVoter(currentAddress);
      alert("Voter registration request sent to validators for approval.");

      let requests = JSON.parse(localStorage.getItem("voterRequests")) || [];
      requests.push({
        aadhaar,
        email,
        address: blockchainAddress,
        status: "Pending",
        approvedBy: [],
      });
      localStorage.setItem("voterRequests", JSON.stringify(requests));


      setAadhaar("");
      setBlockchainAddress("");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Smart contract error while registering voter.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Voter Registration</h2>
        <form onSubmit={handleRegister} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder=" Aadhaar Number"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder=" Blockchain Address"
            value={blockchainAddress}
            onChange={(e) => setBlockchainAddress(e.target.value)}
          />
          <button className={styles.button} type="submit">
             Submit for Approval
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterVoter;
