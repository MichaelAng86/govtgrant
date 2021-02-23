// familyMemberModel.js
var mongoose = require('mongoose');
// Setup schema
var familyMemberSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    maritalStatus: {
        type: String,
        enum: ['Single', 'Married', 'Divorced'],
        required: true
    },
    spouse: {
        type: String,
        required: false
    },
    occupationType: {
        type: String,
        enum: ['Employed', 'Unemployed', 'Student', 'Others'],
        required: false
    },
    annualIncome: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
// Export household model
var familyMember = module.exports = mongoose.model('familyMember', familyMemberSchema);
module.exports.get = function (callback, limit) {
    familyMember.find(callback).limit(limit);
}