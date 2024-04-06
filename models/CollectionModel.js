const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
    {
        memberId: {
            type: Number, // Use ObjectId for reference
            ref: 'Member', // Reference the Member model
            required: true,
        },
        memberName: {
            type: String,
            required: true,
        },
        date: {
            type: Date,  // Corrected to Date for storing date and time
            required: true,
        },
        shift: {
            type: String,
            require: true,
        },
        liter: {
            type: Number,  // Corrected to Number (assuming it's a floating-point number)
            required: true,
        },
        rate: {
            type: Number,  // Corrected to Number (assuming it's a floating-point number)
            required: true,
        },
        amount: {
            type: Number,  // Corrected to Number (assuming it's a floating-point number)
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Collection", CollectionSchema);
