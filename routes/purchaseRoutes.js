const router = require('express').Router();
const purchaseController = require('../controllers/purchaseController');

router.route('/').get(purchaseController.getAllProduct);
router.route('/:id').get(purchaseController.buyProduct);


module.exports = router;