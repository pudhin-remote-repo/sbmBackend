const express = require("express");

const router = express.Router();

const {
  createCollection,
  getCollections,
  getSingleCollection,
  updateCollection,
  deleteCollection,
  getCollectionsByDate,
  getCollectionsByMemberId,
  getCollectionsByToDate,
  sendSMS
} = require("../controllers/collectionController");

router.post("/", createCollection);
router.get("/", getCollections);
router.get("/:id", getSingleCollection);
router.patch("/:id", updateCollection);
router.delete("/:id", deleteCollection);
router.get("/v2/today", getCollectionsByDate);
router.get("/v3/sendSms", sendSMS);
router.get('/v4/member', getCollectionsByMemberId);
router.get("v4/from-to", getCollectionsByToDate);


module.exports = router;