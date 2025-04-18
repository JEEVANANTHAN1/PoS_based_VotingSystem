import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css'
import HomePage from "./components/HomePage";
import Signup from "./components/Users/UserSignup";
import Login from "./components/Users/UserLogin";
import RegisterVoter from "./components/Users/RegisterVoter";
import VoterDashboard from "./components/Users/VoterDashboard"
import Voting from "./components/Users/Voting";
import Results from "./components/Users/Results";
import ValidatorLogin from "./components/Validator/ValidatorLogin";
import ValidatorDashboard from "./components/Validator/ValidatorDashboard.jsx";
import ApproveRequests from "./components/Validator/ApproveRequests";
import TopStakeValidatorDashboard from "./components/TopStakeValidator/TopStakeValidatorDashboard";
import AddCandidate from "./components/TopStakeValidator/AddCandidate";
import PhaseControl from "./components/TopStakeValidator/PhaseControl";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-voter" element={<RegisterVoter />} />
        <Route path="/dashboard" element={<VoterDashboard />} />
        <Route path="/voting" element={<Voting/>}/>
        <Route path="/results" element={<Results/>}/>
        {/* Validator Routes */}
        <Route path="/validator-login" element={<ValidatorLogin/>}/>
        <Route path="/validator-dashboard" element={<ValidatorDashboard/>}/>
        <Route path="/validator/approve-requests" element={<ApproveRequests/>}/>
        {/* Top Stake Validator Routes */}
        <Route path="/topstake/dashboard" element={<TopStakeValidatorDashboard/>}/>
        <Route path="/topstake/add-candidate" element={<AddCandidate/>}/>
        <Route path="/topstake/phase-control" element={<PhaseControl/>}/>
      </Routes>
    </Router>
  );
}

export default App;
