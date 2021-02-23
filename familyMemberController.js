// familyMemberController.js
// Import FamilyMember model
FamilyMember = require('./familyMemberModel');
Household = require('./householdModel');
// Handle index actions
exports.index = function (req, res) {
    FamilyMember.get(function (err, FamilyMembers) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Family members retrieved successfully",
            data: FamilyMembers
        });
    });
};
// Handle create family member actions
exports.new = async function (req, res) {
        let familyMembers = await FamilyMember.find({_id: req.body._id});
        if(familyMembers.length > 0) res.json("FamilyMemberModel already exists");
        let household = await Household.findOne({address: req.body.address});
        //Create family member if only house hold exist
        if(household !== null)
        {
            var familyMember = new FamilyMember();
            familyMember._id = req.body._id;
            familyMember.name = req.body.name;
            familyMember.gender = req.body.gender;
            familyMember.maritalStatus = req.body.maritalStatus;
            familyMember.spouse = req.body.spouse;
            familyMember.occupationType = req.body.occupationType;
            familyMember.annualIncome = req.body.annualIncome;
            familyMember.dob = req.body.dob;
            familyMember.address = req.body.address;
            // save the grant and check for errors
            await familyMember.save(function (err) {}); 
            household.income = household.income + familyMember.annualIncome;
            household.save(function (err) {
                res.json({
                    message: 'New family member created!',
                    data: familyMember
                });
            }); 
        }
        else
        {
            res.json({
                message: 'No such household'
            });
        }
};
// Handle view family member info
exports.view = function (req, res) {
    FamilyMember.findById(req.query.id, function (err, grant) {
        if (err)
            res.send(err);
        res.json({
            message: 'Family member details loading..',
            data: grant
        });
    });
};

// Handle delete family member
exports.delete = function (req, res) {
    FamilyMember.remove({
        _id: req.query.id
    }, function (err, grant) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Family member deleted'
        });
    });
};