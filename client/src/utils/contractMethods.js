// utils/contractMethods.js

import contest from "./contest";

// Request MetaMask account
export const requestAccount = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } else {
    throw new Error("MetaMask not detected");
  }
};

// ✅ Register a voter
export const registerVoter = async (aadhaarHash) => {
  const account = await requestAccount();
  return await contest.methods
    .requestVoterRegistration(aadhaarHash)
    .send({ from: account });
};

// ✅ Approve a voter by validator
export const approveVoter = async (walletAddress) => {
  const account = await requestAccount();
  return await contest.methods.approveVoter(walletAddress).send({ from: account });
};

// ✅ Reject a voter by validator
export const rejectVoter = async (walletAddress) => {
  const account = await requestAccount();
  return await contest.methods.rejectVoter(walletAddress).send({ from: account });
};

// ✅ Add a candidate (Top-Stake Validator Only) 
export const addCandidate = async (name, party, age, qualification) => {
  const account = await requestAccount();
  return await contest.methods
    .addCandidate(name, party, age, qualification)
    .send({ from: account });
};

// ✅ Vote for a candidate
export const vote = async (candidateId) => {
  const account = await requestAccount();
  return await contest.methods.vote(candidateId).send({ from: account });
};

// ✅ Get all candidates
export const getAllCandidates = async () => {
  return await contest.methods.getAllCandidates().call();
};

// ✅ Get candidate by ID (if needed)
export const getCandidate = async (id) => {
  return await contest.methods.getCandidate(id).call();
};

// ✅ Get voter by address
export const getVoter = async (address) => {
  return await contest.methods.getVoter(address).call();
};

// ✅ Get current phase
export const getPhase = async () => {
  return await contest.methods.getCurrentPhase().call();
};

// ✅ Change phase (Top Stake Validator Only)
export const changePhase = async () => {
  const account = await requestAccount();
  return await contest.methods.changePhase().send({ from: account });
};
