const router = require('express').Router()
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    loginUser
} = require('../controllers/user.controller')
const {verifyToken} = require('../middlewares/auth.middleware')

router.get('/users',verifyToken, getAllUsers) 
router.put('/users/:userId',verifyToken, updateUser)
router.delete('/users/:userId',verifyToken, deleteUser)
router.get('/users/:userId',verifyToken, getUserById)

router.post('/login', loginUser)
router.post('/register', createUser)

module.exports = router