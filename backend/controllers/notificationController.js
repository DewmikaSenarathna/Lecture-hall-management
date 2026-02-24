import Notification from "../models/notification.js";
import User from "../models/user.js";



export async function sendNotification(req, res) {
    try {

        if (!req.user) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        const { receiverRole, message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        
        if (
            req.user.role !== "LECTURER" &&
            req.user.role !== "HOD"
        ) {
            return res.status(403).json({
                message: "Only Lecturer or HOD can send notifications"
            });
        }

        let receivers = [];

        
        if (receiverRole === "STUDENTS") {
            receivers = await User.find({ role: "STUDENT" });
        }

      
        else if (receiverRole === "HOD") {
            receivers = await User.find({ role: "HOD" });
        }

        
        else if (receiverRole === "LECTURERS") {
            receivers = await User.find({ role: "LECTURER" });
        }

        else {
            return res.status(400).json({
                message: "Invalid receiver role"
            });
        }

        const receiverIds = receivers.map(user => user._id);

        const notification = new Notification({
            sender: req.user._id,
            receivers: receiverIds,
            message
        });

        await notification.save();

        return res.status(201).json({
            message: "Notification sent successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error sending notification",
            error: error.message
        });
    }
}




export async function getMyNotifications(req, res) {
    try {

        if (!req.user) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        const notifications = await Notification.find({
            receivers: req.user._id
        })
        .populate("sender", "firstName lastName role")
        .sort({ createdAt: -1 });

        return res.status(200).json(notifications);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching notifications",
            error: error.message
        });
    }
}




export async function markNotificationAsRead(req, res) {
    try {

        if (!req.user) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        
        if (!notification.receivers.includes(req.user._id)) {
            return res.status(403).json({
                message: "You are not allowed to access this notification"
            });
        }

       
        if (!notification.readBy.includes(req.user._id)) {
            notification.readBy.push(req.user._id);
            await notification.save();
        }

        return res.status(200).json({
            message: "Notification marked as read"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error marking notification",
            error: error.message
        });
    }
}




export async function getUnreadNotificationCount(req, res) {
    try {

        if (!req.user) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        const notifications = await Notification.find({
            receivers: req.user._id
        });

        const unreadCount = notifications.filter(
            notification =>
                !notification.readBy.includes(req.user._id)
        ).length;

        return res.status(200).json({
            unreadCount
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error getting unread count",
            error: error.message
        });
    }
}