import React, { useEffect, useState } from "react";
import { getAllCandidates, getPhase } from "../../utils/contractMethods";
import styles from "./Results.module.css";

const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [phase, setPhase] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const phase = await getPhase();
      setPhase(phase);

      if (phase === "Result") {
        const result = await getAllCandidates();
        setCandidates(result);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.resultsHeader}>Election Results</h2>
      <div className={styles.space}>

      </div>
      {phase !== "Result" ? (
        <p className={styles.textRed}>Results are not yet available. Please wait for the result phase.</p>
      ) : (
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Party</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.party}</td>
                <td>{parseInt(c.voteCount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Results;
