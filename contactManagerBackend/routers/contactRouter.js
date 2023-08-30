const express = require('express');
const router = express.Router()

const {
    getContacts,
    createContact,
    getContact,
    deleteContact,
    updateContact
} = require("../controllers/contactsController");

const validateToken = require('../middleware/tokenValidator');

router.use(validateToken)
router.route("/").get(getContacts).post(createContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = router 