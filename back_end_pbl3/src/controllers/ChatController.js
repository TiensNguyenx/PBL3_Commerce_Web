const Conversation = require('../services/ChatService');

const createConversation = async (req, res) => {
    try {
    const userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            status: 'ERR',
            message: 'The input is required'
        })
    }

    const response = await Conversation.createConversation(userId)
    return res.status(200).json(response)
    }catch (e) {
        return res.status(404).json({ 
            message: e
        })
    }
}

const createMessage = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await Conversation.createMessage(userId,req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const adminCreateMessage = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await Conversation.adminCreateMessage(userId, req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createConversation,
    createMessage,
    adminCreateMessage
}