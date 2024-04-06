const express = require("express");

const router = express.Router();

const {
  createMember,
  getMembers,
  getSingleMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

router.post("/", createMember);
router.get("/", getMembers);
router.get("/:id", getSingleMember);
router.patch("/:id", updateMember);
router.delete("/:id", deleteMember);

module.exports = router;