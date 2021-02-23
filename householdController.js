// householdController.js
const { v1: uuidv1 } = require('uuid');
// Import HouseHold model
Household = require('./householdModel');
FamilyMember = require('./familyMemberModel');
exports.index = function (req, res) {
    Household.aggregate([
        {
            "$lookup": {
                "from": "familymembers",
                "localField": "address",
                "foreignField": "address",
                "as": "familymembers"
            }
        },
        {
            "$project": {
                "_id": false,
                "income" : false,
                "familymembers._id" : false,
                "familymembers.address" : false, 
                "familymembers.__v" : false
            }
        }
     ]).exec(function(err, results){
        res.json({
            data: results
        });
     })
};
// Handle create grant actions
exports.new = function (req, res) {
    Household.find({ 'address': req.body.address }, function (err, docs) {
        if (docs.length > 0) res.json("Household already exists");
        else
        {
            var household = new Household();
            household._id = uuidv1();
            household.address = req.body.address;
            if(typeof req.body.income === 'undefined') household.income = 0.0;
            else household.income = req.body.income;
            household.housingType = req.body.housingType;
            // save the grant and check for errors
            household.save(function (err) {
            res.json({
                    message: 'New household created!',
                    data: household
                });
            });
        }
    });
};
// Handle view household info
exports.view = function (req, res) {
    Household.aggregate([
        {
            "$match": {"address": req.query.address}
        },
        {
            "$lookup": {
                "from": "familymembers",
                "localField": "address",
                "foreignField": "address",
                "as": "familymembers"
            }
        },
        {
            "$project": {
                "_id": false,
                "income" : false,
                "familymembers._id" : false,
                "familymembers.address" : false, 
                "familymembers.__v" : false
            }
        }
     ]).exec(function(err, results){
        res.json({
            data: results
        });
     })
};

// Handle delete household
exports.delete = async function (req, res) {
    console.log(req.query.address);
    await FamilyMember.remove({
        address: req.query.address
    }, function (err, grant) {
        if (err)
            res.send(err);
    });
    await Household.remove({
        address: req.query.address
    }, function (err, grant) {
        if (err)
            res.send(err);
    res.json({  
            status: "success",
            message: 'Household and its family members deleted'
        });
    });
};