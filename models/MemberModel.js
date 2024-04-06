const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema(
    {
        code:{
            type: Number,
            required: true,
            unique: true,
        },
        
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,  
            required: true,
        },
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Member", MemberSchema);
