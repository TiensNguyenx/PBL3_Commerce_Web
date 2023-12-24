const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    messages: [
        {
            content: { type: String, required: true },
            sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            fullName: { type: String, required: true },
            timestamps: { type: Date, default: Date.now },
        },
    ],
},
    {
        timestamps: true,
    }
);
const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation