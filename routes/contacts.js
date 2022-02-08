const express = require('express');
const router = express.Router();

const controller = require('../controllers/contacts');
const middleware = require('../middleware/auth');

router.get('/contacts', middleware.checkJWT, controller.getContacts);

router.get('/contacts/:id', middleware.checkJWT, controller.getContactById);

router.post('/contacts', middleware.checkJWT, controller.createContact);

router.put('/contatcs/:id', middleware.checkJWT, controller.updateContact);

router.delete('/contacts/:id', middleware.checkJWT, controller.deleteContact);

module.exports = router;