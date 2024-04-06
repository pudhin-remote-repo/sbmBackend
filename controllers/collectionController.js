const mongoose = require("mongoose");
const CollectionModel = require("../models/CollectionModel");
require('dotenv').config();
const twilio = require('twilio');


const accSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = process.env.TWILIO_FROM_NUMBER;

const client = new twilio(accSid, authToken);

// To create a new Member - POST
const createCollection = async (req, res) => {
  const { memberId, memberName, date, shift, liter, rate, amount } = req.body;

  try {
    const collection = await CollectionModel.create({ memberId, memberName, date, shift, liter, rate, amount });
    res.status(200).json(collection);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To get all Taks - GET
const getCollections = async (req, res) => {
  try {
    const collections = await CollectionModel.find({});
    res.status(200).json(collections);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To get a single Task - GET
const getSingleCollection = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Collection Not Found" });
  }
  try {
    const singleCollection = await CollectionModel.findById(id);
    res.status(200).json(singleCollection);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To update a task - PATCH

const updateCollection = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Collection Not Found" });
  }

  try {
    const collection = await CollectionModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      }
    );
    res.status(200).json(collection);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Delete task - DELETE

const deleteCollection = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Collection Not Found" });
  }

  try {
    const collection = await CollectionModel.findByIdAndDelete(id);
    res.status(200).json(collection);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getCollectionsByDate = async (req, res) => {
  const shift  = req.query.shift;
  const date = req.query.date;
  let query = {};
  if(shift){
    query = { shift: shift, date: date};
  } else if(date){
    query = {date : date};
  }else{
    return res.status(400).json({ error: "Either shift or date should be provided" });
  }
  try {
    const collections = await CollectionModel.find(query);

    res.status(200).json(collections);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getCollectionsByMemberId = async (req, res) => {
  const { memberId } = req.query.memberId;
  try {
    const collections = await CollectionModel.find({
      memberId: memberId
      // date: { $gte: fromDate, $lte: toDate }
    });
    res.status(200).json(collections);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getCollectionsByToDate= async (req, res) => {
  const { fromDate, toDate } = req.body;

  try {
    const collections = await CollectionModel.find({
      date: { $gte: fromDate, $lte: toDate }
    });

    res.status(200).json(collections);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};


const sendSMS = async () => {
  const noCode = "+91";
  const toNum = "6379517230";
  const number = noCode + "" + toNum;

  const bodyDetails1 = "Date: 02-03-2024";
  const bodyDetails2 = "Shift: Morning";
  const bodyDetails3 = "Liter: 2.00";
  const bodyDetails4 = "Rate: 25.00";
  const bodyDetails5 = "Amount: 50.00";

  // Concatenate with line breaks
  const body = `${bodyDetails1}\n${bodyDetails2}\n${bodyDetails3}\n${bodyDetails4}\n${bodyDetails5}`;


  // const body = bodyDetails1 + " " + bodyDetails2;
  const msgOption = {
    from: twilioNum,
    to: number,
    body
  }
  try {
    const msg = await client.messages.create(msgOption);
    console.log(msg);
  } catch (err) {
    console.log(err);
  }
}



module.exports = {
  createCollection,
  getCollections,
  getSingleCollection,
  updateCollection,
  deleteCollection,
  getCollectionsByDate,
  getCollectionsByMemberId,
  getCollectionsByToDate,
  sendSMS
};