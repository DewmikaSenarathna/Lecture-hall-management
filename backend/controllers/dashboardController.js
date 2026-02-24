import LectureHall from "../models/lectureHall.js";
import TimeSlot from "../models/timeSlot.js";
import Booking from "../models/booking.js";
import User from "../models/user.js";

export async function getDashboardStats(req, res) {
    try {

        if (!req.user) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        
        if (req.user.role === "ADMIN") {

            const totalHalls = await LectureHall.countDocuments();
            const totalSlots = await TimeSlot.countDocuments();
            const totalBookings = await Booking.countDocuments();
            const totalUsers = await User.countDocuments();

            return res.status(200).json({
                role: "ADMIN",
                totalHalls,
                totalSlots,
                totalBookings,
                totalUsers
            });
        }

        
        if (req.user.role === "HOD") {

            const pending = await Booking.countDocuments({ status: "PENDING" });
            const approved = await Booking.countDocuments({ status: "APPROVED" });
            const rejected = await Booking.countDocuments({ status: "REJECTED" });

            return res.status(200).json({
                role: "HOD",
                pending,
                approved,
                rejected
            });
        }

       
        if (req.user.role === "LECTURER") {

            const pending = await Booking.countDocuments({
                lecturer: req.user._id,
                status: "PENDING"
            });

            const approved = await Booking.countDocuments({
                lecturer: req.user._id,
                status: "APPROVED"
            });

            const rejected = await Booking.countDocuments({
                lecturer: req.user._id,
                status: "REJECTED"
            });

            return res.status(200).json({
                role: "LECTURER",
                pending,
                approved,
                rejected
            });
        }

       
        if (req.user.role === "STUDENT") {

            const totalApprovedBookings = await Booking.countDocuments({
                status: "APPROVED"
            });

            return res.status(200).json({
                role: "STUDENT",
                totalApprovedBookings
            });
        }

       
        return res.status(400).json({
            message: "Invalid user role"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching dashboard",
            error: error.message
        });
    }
}