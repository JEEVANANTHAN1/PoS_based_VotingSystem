import React, { useEffect, useState } from "react";
import { getAllCandidates, vote } from "../../utils/contractMethods";
import styles from "./Voting.module.css";

const Voting = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const result = await getAllCandidates();
        setCandidates(result);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async (id) => {
    if (!id) {
      alert("Please select a candidate.");
      return;
    }

    try {
      setLoading(true);
      await vote(id);  // Vote for the selected candidate
      alert("Vote cast successfully!");
    } catch (err) {
      console.error("Voting failed:", err);
      alert("Failed to vote. You may have already voted or phase is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.votingContainer}>
      <div className={styles.votingCard}>
        <h2>Voting Area</h2>

        <div className={styles.candidateList}>
          {candidates.map((c) => (
            <div key={c.id} className={styles.candidateItem}>
              <label>
                <p>Name: <strong>{c.name}</strong></p>
                <p>Age: <strong>{c.age}</strong></p>
                <p>Party: <strong>{c.party}</strong></p>
                <p>Qualification: <strong>{c.qualification}</strong></p>
              </label>
              {/* Adding a vote button for each candidate */}
              <button
                className={styles.voteButton}
                onClick={() => handleVote(c.id)} // Vote for the candidate
                disabled={loading}
              >
                {loading ? "Voting..." : "Vote"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Voting;
