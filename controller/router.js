const express = require('express');
const router = express.Router();
const controller = require('./contoller');

router.post('/newContact', controller.newContact);

router.post('/uploadAvatar', controller.uploadAvatar);

router.get('/getContactList/:id', controller.getContactList);

router.get('/deleteContact/:id', controller.deleteContact);

router.post('/sendMail', controller.sendMail);

router.post('/updateContact', controller.updateContact);

router.post('/newUser', controller.newUser);

router.post('/loginUser', controller.loginUser);
// Anything that doesn't match the above, send back index.html

router.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
module.exports = router;
