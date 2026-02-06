const pool = require('../database/connection')
const { v4: uuidv4 } = require('uuid')

const getAllContacts = () =>
    new Promise((resolve, reject) => {
        const sql = 'SELECT contact_id, fullname, email, phone, company, job_title, notes FROM contacts'
        pool.query(sql)
            .then(res => resolve(res.rows))
            .catch(err => reject(err))
    })

const createContact = (fullName, email, phone, company, job_title, notes) =>
    new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO contacts (contact_id, fullname, email, phone, company, job_title, notes)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`
        const values = [uuidv4(), fullName, email, phone, company, job_title, notes]

        pool.query(sql, values)
            .then(res => resolve(res.rows))
            .catch(err => reject(err))
    })

const updateContact = (contactId, fullName, email, phone, company, job_title, notes) =>
    new Promise((resolve, reject) => {
        const sql = `
            UPDATE contacts
            SET fullname = $1, email = $2, phone = $3, company = $4, job_title = $5, notes = $6
            WHERE contact_id = $7 RETURNING *
        `
        const values = [fullName, email, phone, company, job_title, notes, contactId]

        pool.query(sql, values)
            .then(res => resolve(res.rows))
            .catch(err => reject(err))
    })

const deleteContact = (contactId) =>
    new Promise((resolve, reject) => {
        const sql = `DELETE FROM contacts WHERE contact_id = $1 RETURNING *`
        pool.query(sql, [contactId])
            .then(res => resolve(res.rows))
            .catch(err => reject(err))
    })

const getContactById = (contactId) =>
    new Promise((resolve, reject) => {
        const sql = `SELECT contact_id, fullname, email, phone, company, job_title, notes FROM contacts WHERE contact_id = $1`
        pool.query(sql, [contactId])
            .then(res => resolve(res.rows[0]))
            .catch(err => reject(err))
    })

module.exports = {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    getContactById

}