// grantController.js
// Import HouseHold and FamilyMember model
Household = require('./householdModel');
FamilyMember = require('./familyMemberModel');

// Handle view grant info
exports.view = async function (req, res, next) {
    var currentTime = new Date();
    var scheme = req.query.scheme;
    const income = Number(req.query.income);
    const age = Number(req.query.age);

    switch(scheme) {
        case "StudentEncouragementBonus":
          // code block
          var start = new Date(currentTime.getTime() - age * 31556952000);
          Household.aggregate([
            {
                "$match": {"income": {"$lt" : income}}
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
                "$unwind":"$familymembers"
             },
             {
                "$match":{
                   "familymembers.dob":{
                      "$gte": start,
                      "$lt": currentTime
                   }
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
          break;
        case "FamilyTogethernessScheme":
            var start = new Date(currentTime.getTime() - age * 31556952000);
            var addressArr = [];
            let marriedMembers = await FamilyMember.find({dob: {$gte: start, $lt: currentTime}});
            for(var i = 0; i < marriedMembers.length;i++){
                if(addressArr.indexOf(marriedMembers[i].address) === -1)
                    addressArr.push(marriedMembers[i].address);
            }
            let marriedMembers2 = await FamilyMember.find({address: {"$in" : addressArr},
            maritalStatus: "Married"});
            res.json({
                data: marriedMembers2
            });
          break;
        case "ElderBonus":
            var end = new Date(currentTime.getTime() - age * 31556952000);
            Household.aggregate([
                {
                    "$match": {"housingType": "HDB"}
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
                    "$unwind":"$familymembers"
                 },
                 {
                    "$match":{
                       "familymembers.dob":{
                          "$gte": new Date('1820'),
                          "$lt": end
                       }
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
          break;
        case "BabySunshineGrant":
            var start = new Date(currentTime.getTime() - age * 31556952000);
            FamilyMember.aggregate([
                {
                    "$match": {"dob": {"$gte": start, "$lt": currentTime}}
                },
                {
                    "$lookup": {
                        "from": "households",
                        "localField": "address",
                        "foreignField": "address",
                        "as": "households"
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
          break;
        case "YOLOGSTGrant":
            Household.find({ 'income': {"$lt" : income} }, function (err, docs) {
                res.json({
                    data: docs
                });
            });
          break;
        default:
          // code block
      }
};