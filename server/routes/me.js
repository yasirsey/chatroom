const router = require('express').Router()

const auth = require('../middlewares/auth')
const meController = require('../controllers/me')
const validation = require('../middlewares/validation/user')

router.get('/', auth.user, meController.getProfile)
router.patch('/', auth.user, validation.updateVal, meController.updateProfile)
router.delete('/', auth.user, meController.deleteProfile)

module.exports = router