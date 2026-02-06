const express = require('express')
const router = express.Router()
const {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    getContactById
} = require('../controllers/contact.controller')

const {verifyToken} = require('../middlewares/auth.middleware')

router.get('/contacts', verifyToken, getAllContacts) 
router.post('/contacts', verifyToken, createContact)
router.put('/contacts/:contactId', verifyToken, updateContact)
router.delete('/contacts/:contactId', verifyToken, deleteContact)
router.get('/contacts/:contactId', verifyToken, getContactById)

module.exports = router