const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/check-eligibility", async (req, res) => {
  const { aadhaar } = req.body;

  try {
    const [rows] = await db.execute("SELECT * FROM voter_whitelist WHERE aadhaar = ?", [aadhaar]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "Aadhaar not found in voter list" });
    }

    const voter = rows[0];
    console.log("Voter record:", voter);

    if (voter.age < 18 || !voter.isEligible) {
      return res.status(403).json({ message: "Not eligible to vote" });
    }
    
    return res.json({ message: "Eligible", email: voter.email });
  } catch (error) {
    console.error("Error checking eligibility:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
