const asyncHandler = require("express-async-handler")
const contactModel = require('../models/contactModel');

// @desc Get all contacts
// @route GET /api/contacts/
// @access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await contactModel.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})

// @desc Create all contacts
// @route POST /api/contacts/
// @access private
const createContact = asyncHandler(async (req, res) => {

    const { name, contactNumber } = req.body
    console.log(req.body);
    if (!name || !contactNumber) {
        res.status(404)
        throw new Error("All fields are necessary.! ")
    }

    const newContact = await contactModel.create({
        user_id: req.user.id,
        name: name,
        contactNumber: contactNumber
    })
    res.status(201).json(newContact)
})

// @desc Get contact with id
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {

    const findContact = await contactModel.findById(req.params.id)

    if (!findContact) {
        res.status(404)
        throw new Error("Contact not found!!!")
    }
    res.status(200).json(findContact)
})

// @desc Delete contact with id
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {

    const findContact = await contactModel.findById(req.params.id)

    if (!findContact) {
        res.status(404)
        throw new Error("Contact not found!!!")
    }

    if (findContact.user_id.toString() != req.user.id) {
        res.status(403)
        throw new Error("User not authorized to update other user contacts")
    }

    await contactModel.deleteOne({ _id: req.params.id })
    res.status(200).json(findContact)
    console.log("Contact Removed");
}
)
// @desc Update contact with id
// @route POST /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {

    const findContact = await contactModel.findById(req.params.id)

    if (!findContact) {
        res.status(404)
        throw new Error("Contact not found!!!!")
    }

    if (findContact.user_id.toString() != req.user.id) {
        res.status(403)
        throw new Error("User not authorized to update other user contacts")
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedContact)
    console.log("Contact Updated");
})


module.exports = { getContacts, createContact, getContact, deleteContact, updateContact }