const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
    {
        content: { type: String },
    },
    {
        timestamps: true
    }
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification