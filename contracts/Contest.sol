// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Contest {
    // === STRUCTS ===
    struct Voter {
        string aadhaarHash;
        address wallet;
        bool isRegistered;
        bool hasVoted;
        uint votedTo;
        address[] approvedBy;
        bool rejected;
    }

    struct Candidate {
        uint id;
        string name;
        string party;
        uint age;
        string qualification;
        uint voteCount;
    }

    // === ENUM ===
    enum Phase { Registration, Voting, Result }
    Phase public currentPhase;

    // === STATE ===
    address public owner;
    address public topStakeValidator;

    mapping(address => bool) public isValidator;
    mapping(address => uint256) public validatorStake;
    mapping(address => uint256) public validatorRewards;

    mapping(address => Voter) public voters;
    mapping(address => bool) public hasRequested;
    mapping(uint => Candidate) public candidates;
    uint public candidateCount;

    address[] public validatorList;

    // === EVENTS ===
    event VoterRequested(address voter);
    event VoterApproved(address voter, address validator);
    event VoterRegistered(address voter);
    event CandidateAdded(uint id, string name);
    event PhaseChanged(uint phase);
    event Voted(address voter, uint candidateId);

    // === MODIFIERS ===
    modifier onlyValidator() {
        require(isValidator[msg.sender], "Not a validator");
        _;
    }

    modifier onlyTopStakeValidator() {
        require(msg.sender == topStakeValidator, "Not top stake validator");
        _;
    }

    modifier onlyDuringPhase(Phase _phase) {
        require(currentPhase == _phase, "Wrong phase");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "Not registered to vote");
        _;
    }

    constructor(
        address v1,
        address v2,
        address v3,
        address _topStakeValidator
    ) {
        owner = msg.sender;

        isValidator[v1] = true;
        isValidator[v2] = true;
        isValidator[v3] = true;

        topStakeValidator = _topStakeValidator;

        validatorStake[v1] = 10 ether;
        validatorStake[v2] = 10 ether;
        validatorStake[v3] = 10 ether;

        validatorList.push(v1);
        validatorList.push(v2);
        validatorList.push(v3);

        currentPhase = Phase.Registration;
    }

    // === VOTER REGISTRATION REQUEST ===
    function requestVoterRegistration(string memory _aadhaarHash) public {
        require(!hasRequested[msg.sender], "Already requested");
        require(currentPhase == Phase.Registration, "Not in registration phase");

        Voter storage v = voters[msg.sender];
        v.aadhaarHash = _aadhaarHash;
        v.wallet = msg.sender;
        v.isRegistered = false;
        v.hasVoted = false;
        v.rejected = false;

        hasRequested[msg.sender] = true;

        emit VoterRequested(msg.sender);
    }

    // === APPROVE VOTER ===
    function approveVoter(address voterAddr) public onlyValidator {
        Voter storage v = voters[voterAddr];
        require(!v.rejected, "Voter rejected");
        require(!v.isRegistered, "Already registered");

        for (uint i = 0; i < v.approvedBy.length; i++) {
            require(v.approvedBy[i] != msg.sender, "Already approved");
        }

        v.approvedBy.push(msg.sender);
        emit VoterApproved(voterAddr, msg.sender);

        if (v.approvedBy.length ==1) {
            v.isRegistered = true;
            validatorRewards[msg.sender] += 1 ether;
            emit VoterRegistered(voterAddr);
        }
    }

    // === REJECT VOTER ===
    function rejectVoter(address voterAddr) public onlyValidator {
        Voter storage v = voters[voterAddr];
        require(!v.isRegistered, "Already registered");
        v.rejected = true;
        validatorStake[msg.sender] -= 0.5 ether; // penalty
    }

    // === ADD CANDIDATE ===
    function addCandidate(
        string memory _name,
        string memory _party,
        uint _age,
        string memory _qualification
    ) public onlyTopStakeValidator onlyDuringPhase(Phase.Registration) {
        candidateCount++;
        candidates[candidateCount] = Candidate(
            candidateCount,
            _name,
            _party,
            _age,
            _qualification,
            0
        );
        emit CandidateAdded(candidateCount, _name);
    }

    // === CHANGE PHASE ===
    function changePhase() public onlyTopStakeValidator {
        require(uint(currentPhase) < 2, "Already in final phase");
        currentPhase = Phase(uint(currentPhase) + 1);
        emit PhaseChanged(uint(currentPhase));
    }

    // === CAST VOTE ===
    function vote(uint candidateId) public onlyRegisteredVoter onlyDuringPhase(Phase.Voting) {
        Voter storage v = voters[msg.sender];
        require(!v.hasVoted, "Already voted");
        require(candidateId > 0 && candidateId <= candidateCount, "Invalid candidate");

        candidates[candidateId].voteCount++;
        v.hasVoted = true;
        v.votedTo = candidateId;

        emit Voted(msg.sender, candidateId);
    }

    // === VIEW RESULTS ===
    function getCandidate(uint id) public view returns (Candidate memory) {
        return candidates[id];
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory result = new Candidate[](candidateCount);
        for (uint i = 1; i <= candidateCount; i++) {
            result[i - 1] = candidates[i];
        }
        return result;
    }

    function getVoter(address addr) public view returns (Voter memory) {
        return voters[addr];
    }

    function getCurrentPhase() public view returns (string memory) {
        if (currentPhase == Phase.Registration) return "Registration";
        if (currentPhase == Phase.Voting) return "Voting";
        return "Result";
    }
}
