// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import household controller
var householdController = require('./householdController');
// household routes
router.route('/households')
    .get(householdController.index)
    .post(householdController.new);
router.route('/household')
    .get(householdController.view)
    .delete(householdController.delete);


// Import grant controller
var grantController = require('./grantController');
// Grant routes
router.route('/grant')
    .get(grantController.view)
    

// Import familymember controller
var familyMemberController = require('./familyMemberController');
// Contact routes
router.route('/familyMembers')
    .get(familyMemberController.index)
    .post(familyMemberController.new);
router.route('/familyMember')
    .get(familyMemberController.view)
    .delete(familyMemberController.delete);

// Export API routes
module.exports = router;