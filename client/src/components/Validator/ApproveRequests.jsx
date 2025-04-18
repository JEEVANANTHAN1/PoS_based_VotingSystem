import React, { useState, useEffect } from "react";
import styles from "./ApproveRequests.module.css";
import { approveVoter, rejectVoter } from "../../utils/contractMethods";

const ApproveRequests = () => {
  const [requests, setRequests] = useState([]);
  const validatorAddress = localStorage.getItem("validatorAddress");

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("voterRequests")) || [];
    setRequests(storedRequests);
  }, []);

  const handleApprove = async (walletAddress) => {
    const updated = [...requests];
    const voter = updated.find((r) => r.address === walletAddress);

    if (!voter) return;

    if (voter.status === "Approved") {
      alert("This voter is already approved.");
      return;
    }

    if (!voter.approvedBy) voter.approvedBy = [];

    if (voter.approvedBy.includes(validatorAddress)) {
      alert("You have already approved this request.");
      return;
    }

    try {
      await approveVoter(walletAddress); // Smart contract call
      voter.approvedBy.push(validatorAddress);

      // Update status based on number of approvals
      voter.status = voter.approvedBy.length >= 2 ? "Approved" : "Pending";

      localStorage.setItem("voterRequests", JSON.stringify(updated));
      setRequests(updated);
    } catch (error) {
      console.error("Approval failed:", error);
      alert("Smart contract approval failed.");
    }
  };

  const handleReject = async (walletAddress) => {
    const updated = [...requests];
    const voter = updated.find((r) => r.address === walletAddress);

    if (!voter || voter.status === "Approved") {
      alert("Cannot reject an approved voter.");
      return;
    }

    try {
      await rejectVoter(walletAddress); // Smart contract call
      voter.status = "Rejected";

      localStorage.setItem("voterRequests", JSON.stringify(updated));
      setRequests(updated);
    } catch (error) {
      console.error("Rejection failed:", error);
      alert("Smart contract rejection failed.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Pending Voter Requests</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Aadhaar</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req, index) => (
                <tr key={index}>
                  <td>{req.aadhaar}</td>
                  <td>{req.email}</td>
                  <td>{req.address}</td>
                  <td>{req.status || "Pending"}</td>
                  <td>
                    {req.status !== "Approved" && req.status !== "Rejected" && (
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={() => handleApprove(req.address)}>Approve</button>
                        <button onClick={() => handleReject(req.address)}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No voter requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRequests;
