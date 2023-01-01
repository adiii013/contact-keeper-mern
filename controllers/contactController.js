const Contact = require('../models/contactModel')

const noteController = {
    getContacts :async (req,res)=>{
       try {
        const contacts = await Contact.find({user_id:req.user.id})
        res.json(contacts)
       } catch (error) {
         return res.status(500).json({msg:error.message})
       }
    },
    createContact:async(req,res)=>{
        try {
          const {name,phoneNo} = req.body;
          const contact = new Contact({
            name:name,
            phoneNo:phoneNo,
            user_id:req.user.id
          })
          await contact.save()
          res.json(contact)
        } catch (error) {
          return res.status(500).json({msg:error.message})
        } 
    },
    deleteContact:async(req,res)=>{
        try {
          await Contact.findByIdAndDelete(req.params.id)
          res.json({msg:"Deleted Succesfully"})
        } catch (error) {
          return res.status(500).json({msg:error.message})
        }
    },
    updateContact: async(req,res)=>{
        try {
          const {name,phoneNo} = req.body
          await Contact.findOneAndUpdate({_id:req.params.id},{
            name,phoneNo
          })
          res.json({msg:"Updated Succesfully"})
        } catch (error) {
          return res.status(500).json({msg:error.message})
        }
    },
    getContact: async(req,res)=>{
        try {
         const contact = await Contact.findById(req.params.id)
         res.json(contact)
        } catch (error) {
          return res.status(500).json({msg:error.message})
        }
    }
}

module.exports = noteController
