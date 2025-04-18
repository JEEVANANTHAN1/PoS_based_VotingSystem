import React, { useState } from "react";
import styles from "./AddCandidate.module.css";
import { addCandidate } from "../../utils/contractMethods";

const AddCandidate = () => {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");
  const [qualification, setQualification] = useState("");

  const handleAddCandidate = async () => {
    if (!name || !party || !age || !qualification) {
      alert("Fill all fields");
      return;
    }

    try {
      await addCandidate(name, party, age, qualification);
      alert("Candidate added successfully!");

      setName("");
      setParty("");
      setAge("");
      setQualification("");
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Failed to add candidate. Make sure you're logged in as Top Stake Validator.");
    }
  };

  return (
    <div className={styles["candidate-container"]}>
      <h1 className={styles["candidate-title"]}>Add Candidate</h1>

      <div className={styles["form-box"]}>
        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          className={styles["form-input"]}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Party"
          value={party}
          className={styles["form-input"]}
          onChange={(e) => setParty(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          className={styles["form-input"]}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Qualification"
          value={qualification}
          className={styles["form-input"]}
          onChange={(e) => setQualification(e.target.value)}
        />

        <button className={styles["submit-button"]} onClick={handleAddCandidate}>
          Add Candidate
        </button>
      </div>
    </div>
  );
};

export default AddCandidate;
