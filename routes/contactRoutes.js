const router = require('express').Router()
const contactController = require('../controllers/contactController')
const auth = require('../middleware/auth')

router.route('/').get(auth,contactController.getContacts).post(auth,contactController.createContact)
router.route('/:id').get(auth,contactController.getContact).put(auth,contactController.updateContact).delete(auth,contactController.deleteContact)


module.exports = router