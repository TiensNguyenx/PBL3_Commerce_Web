const express = require('express');
const router = express.Router();
const { createConversation,adminCreateMessage,getAllMessage } = require('../../controllers/ChatController');

router.get('/:id', createConversation);

router.post('/send-message/:id', adminCreateMessage);

router.get('/get-all-message', getAllMessage);

module.exports = router;