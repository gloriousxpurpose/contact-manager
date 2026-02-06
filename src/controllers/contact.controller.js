const userModel = require('../models/contact.model')
const {errorHandler, successHandler} = require('../utils/responses')

const getAllContacts = async (req, res) => {
    try {

        const allContacts = await userModel.getAllContacts()

        if (!allContacts || allContacts.length === 0 ) {
            return errorHandler(
                res,
                false,
                404,
                "Belum ada contact"
            )
        } return successHandler(
            res,
            true,
            200,
            "Menampilkan seluruh contact",
            allContacts
        )

    } catch (error) {
        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)        
    }
}
const createContact = async (req, res) => {
    try {

        const {fullName, email, phone, company, job_title, notes} = req.body

        if (!fullName || !email || !phone || !company || !job_title || !notes ) {
            return errorHandler(
                res, 
                false, 
                400, 
                "Semua field wajib diisi")}        

        const createdContact = await userModel.createContact(
            fullName,  
            email,
            phone,
            company,
            job_title,
            notes
            )

        if (createdContact.rowCount === 0) {

            return errorHandler(
                res, 
                false, 
                400, 
                "Gagal membuat user")}
                
        return successHandler(
            res, 
            true, 
            201, 
            "Course berhasil dibuat", 
            createdContact)

    } catch (error) {

        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)
    }
}

const updateContact = async (req, res) => {
    try {
        const {contactId} = req.params

        const {fullName, email, phone, company, job_title, notes} = req.body 

        if (!fullName || !email || !phone || !company || !job_title || !notes ) {

            return errorHandler(
                res, 
                false, 
                400, 
                "Semua field wajib diisi")}

        const updatedContact = await userModel.updateContact(contactId, fullName, email, phone, company, job_title, notes)

        if (updatedContact.rowCount === 0) {
            return errorHandler(
                res, 
                false, 
                404, 
                "Gagal membuat contact")
        }

        return successHandler(
            res, 
            true, 
            200, 
            "Contact berhasil diperbarui", 
            updatedContact)        
        
    } catch (error) {

        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)
    }
}

const deleteContact = async (req, res) => {
    
    try {

        const {contactId} = req.params

        const contact = await userModel.getContactById(contactId)

        if (!contact || contact.length === 0) {

            return errorHandler(
                res, 
                false, 
                404, 
                "Contact tidak ditemukan")
        }
        
        const deletedContact = await userModel.deleteContact(contactId)

        if (deletedContact.rowCount === 0) {

            return errorHandler(
                res, 
                false, 
                404, 
                "Contact tidak ditemukan")}

        return successHandler(

            res, 
            true, 
            200, 
            "Contact berhasil dihapus", 
            deletedContact)
            
    } catch (error) {

        return errorHandler(
        res, 
        false, 
        500, 
        `Internal Server Error: ${error.message}`)

    }
}

const getContactById = async (req, res) => {
    try {
        const {contactId} = req.params

        const contact = await userModel.getContactById(contactId)

        if (!contact || contact.length === 0) {

            return errorHandler(
                res, 
                false, 
                404, 
                "Contact tidak ditemukan")}

        return successHandler(
            res, 
            true, 
            200, 
            "Contact berhasil ditemukan", 
            contact)

    } catch (error) {

        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)}
}

module.exports = {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    getContactById
}