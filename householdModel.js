// householdModel.js
var mongoose = require('mongoose');
// Setup schema
var householdSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: 'true',
        required: true
    },
    income: {
        type: Number,
        required: false
    },
    housingType: {
        type: String,
        enum: ['Landed', 'HDB', 'Condominium'],
        required: false
    }
});
// Export household model
var household = module.exports = mongoose.model('household', householdSchema);
module.exports.get = function (callback, limit) {
    household.find(callback).limit(limit);
}