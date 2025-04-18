import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ValidatorLogin.module.css";
import { VALIDATOR_ADDRESSES } from "../../utils/Validator";
import { ethers } from "ethers";

const ValidatorLogin = () => {
  const navigate = useNavigate();

  const getCurrentAddress = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return address;
    } else {
      alert("MetaMask not detected");
      return null;
    }
  };

  const handleLogin = async (index) => {
    const selectedAddress = VALIDATOR_ADDRESSES[index];
    const currentAddress = await getCurrentAddress();

    if (!currentAddress) {
      alert("MetaMask is not connected.");
      return;
    }

    if (currentAddress.toLowerCase() === selectedAddress.toLowerCase()) {
      
      localStorage.setItem("validatorAddress", selectedAddress);
      navigate("/validator/approve-requests");
    } else {
      alert("❌ This MetaMask address does not match the selected validator.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Select Validator to Login</h2>

        <div className={styles.buttons}>
          {VALIDATOR_ADDRESSES.map((addr, idx) => (
            <button
              key={idx}
              onClick={() => handleLogin(idx)}
              className={styles.button}
            >
              Login as Validator {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValidatorLogin;
