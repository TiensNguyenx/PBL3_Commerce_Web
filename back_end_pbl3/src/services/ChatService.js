const Conversation = require('../models/ConversationModel');
const User = require('../models/UserModel');

const createConversation = (id) => {
    return new Promise(async (resolve, reject) => {
        const userId = id;
        try {
            const checkConversation = await Conversation.findOne({ user: userId });
            if (checkConversation) {
                return resolve({
                    message: checkConversation.messages
                })
            }
            else {
                const user = await User.findById(userId);
                const createConversation = await Conversation.create({
                    user: userId,
                    name: user.name,
                    email: user.email,
                    messages: []
                })
                if (createConversation) {
                    resolve({
                        message: createConversation.messages
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

const createMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userId = id;
            const content = message.content;
            const user = await User.findById(userId);
            await Conversation.findOneAndUpdate({ user: userId }, {
                $push: {
                    messages: {
                        content: content,
                        sender: userId,
                        fullName: user.name,
                    }
                }
            })
            const createMessage = await Conversation.findOne({user: userId})
            if (createMessage) {
                resolve({
                    message: createMessage.messages
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const adminCreateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userId = id;
            const content = message.content;
            const admin = await User.find({isAdmin: true})
            await Conversation.findOneAndUpdate({ user: userId }, {
                $push: {
                    messages: {
                        content: content,
                        sender: admin._id,
                        fullName: 'admin',
                    }
                }
            })
            const createMessage = await Conversation.findOne({user: userId})
            if (createMessage) {
                resolve({
                    message: createMessage.messages
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createConversation,
    createMessage,
    adminCreateMessage
}