const mongoose = require("mongoose");
const MemberModel = require("../models/MemberModel");

// To create a new Member - POST
const createMember = async (req, res) => {
  const { code, name, mobile } = req.body;

  try {
    const member = await MemberModel.create({ code, name, mobile });
    res.status(200).json(member);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To get all Taks - GET
const getMembers = async (req, res) => {
  try {
    const members = await MemberModel.find({});
    res.status(200).json(members);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To get a single Task - GET
const getSingleMember = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Member Not Found" });
  }
  try {
    const singleMember = await MemberModel.findById(id);
    res.status(200).json(singleMember);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To update a task - PATCH

const updateMember = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Member Not Found" });
  }

  try {
    const member = await MemberModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      }
    );
    res.status(200).json(member);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Delete task - DELETE

const deleteMember = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Member Not Found" });
  }

  try {
    const task = await MemberModel.findByIdAndDelete(id);
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  createMember,
  getMembers,
  getSingleMember,
  updateMember,
  deleteMember,
};