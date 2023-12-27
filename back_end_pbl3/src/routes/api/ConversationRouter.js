const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/ChatController');

router.get('/:id', chatController.createConversation);

router.post('/send-message/:id', chatController.createMessage);

module.exports = router;