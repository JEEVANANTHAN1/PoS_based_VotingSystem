import React, { useEffect, useState } from "react";
import styles from "./PhaseControl.module.css";
import { changePhase, getPhase } from "../../utils/contractMethods";

const PhaseControl = () => {
  const [phase, setPhase] = useState("Registration");
  const [currentPhase, setCurrentPhase] = useState("");

  useEffect(() => {
    const fetchPhase = async () => {
      try {
        const phase = await getPhase();
        setCurrentPhase(phase);
      } catch (err) {
        console.error("Error fetching phase:", err);
      }
    };

    fetchPhase();
  }, []);

  const handlePhaseChange = async () => {
    let phaseId = 0;
    if (phase === "Voting") phaseId = 1;
    else if (phase === "Result") phaseId = 2;

    try {
      await changePhase(phaseId);
      alert(`Phase changed to: ${phase}`);
      setCurrentPhase(phase); // update after change
    } catch (error) {
      console.error("Phase change failed:", error);
      alert("Only the Top Stake Validator can change the phase!");
    }
  };

  return (
    <div className={styles["phase-container"]}>
      <h1 className={styles["phase-title"]}>Manage Election Phase</h1>

      <div className={styles["current-phase"]}>
        Current Phase: <span>{currentPhase}</span>
      </div>

      <div className={styles["form-box"]}>
        <select
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
          className={styles["form-select"]}
        >
          <option value="Registration">Registration</option>
          <option value="Voting">Voting</option>
          <option value="Result">Result</option>
        </select>

        <button className={styles["submit-button"]} onClick={handlePhaseChange}>
          Change Phase
        </button>
      </div>
    </div>
  );
};

export default PhaseControl;
