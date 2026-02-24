import Booking from "../models/booking.js";
import TimeSlot from "../models/timeSlot.js";



export async function createBooking(req, res) {
    try {

        
        if (!req.user || 
            (req.user.role !== "LECTURER" && req.user.role !== "HOD")) {
            return res.status(403).json({
                message: "Only Lecturer or HOD can book"
            });
        }

        const slot = await TimeSlot.findById(req.body.timeSlotId);

        if (!slot) {
            return res.status(404).json({
                message: "Time slot not found"
            });
        }

        
        const now = new Date();
        const slotDateTime = new Date(`${slot.date}T${slot.startTime}:00`);

        if (slotDateTime < now) {
            return res.status(400).json({
                message: "Cannot book past time slots"
            });
        }

        
        if (slot.status !== "AVAILABLE") {
            return res.status(400).json({
                message: "Slot already locked or booked"
            });
        }

       
        if (req.user.role === "HOD") {
            slot.status = "BOOKED";
        } else {
            slot.status = "LOCKED";
        }

        slot.lockedBy = req.user._id;
        await slot.save();

        const booking = new Booking({
            lecturer: req.user._id,
            timeSlot: slot._id,
            status: req.user.role === "HOD" ? "APPROVED" : "PENDING"
        });

        await booking.save();

        return res.status(201).json({
            message: req.user.role === "HOD"
                ? "Booking confirmed successfully"
                : "Booking request sent for approval"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error creating booking",
            error: error.message
        });
    }
}




export async function updateBookingStatus(req, res) {
    try {

        if (!req.user || req.user.role !== "HOD") {
            return res.status(403).json({
                message: "Only HOD can approve or reject"
            });
        }

        const booking = await Booking.findById(req.params.id)
            .populate("timeSlot");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        const { status } = req.body;

        if (status !== "APPROVED" && status !== "REJECTED") {
            return res.status(400).json({
                message: "Invalid status value"
            });
        }

        booking.status = status;

        if (status === "APPROVED") {
            booking.timeSlot.status = "BOOKED";
        } else {
            booking.timeSlot.status = "AVAILABLE";
            booking.timeSlot.lockedBy = null;
        }

        await booking.timeSlot.save();
        await booking.save();

        return res.status(200).json({
            message: "Booking updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error updating booking",
            error: error.message
        });
    }
}




export async function cancelBooking(req, res) {
    try {

        if (!req.user) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        const booking = await Booking.findById(req.params.id)
            .populate("timeSlot");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        
        if (
            req.user.role !== "ADMIN" &&
            req.user.role !== "HOD" &&
            booking.lecturer.toString() !== req.user._id
        ) {
            return res.status(403).json({
                message: "You cannot cancel this booking"
            });
        }

        if (booking.status === "REJECTED") {
            return res.status(400).json({
                message: "Rejected bookings cannot be cancelled"
            });
        }

        
        booking.timeSlot.status = "AVAILABLE";
        booking.timeSlot.lockedBy = null;
        await booking.timeSlot.save();

        
        booking.status = "REJECTED";
        booking.cancelledAt = new Date();
        await booking.save();

        return res.status(200).json({
            message: "Booking cancelled successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error cancelling booking",
            error: error.message
        });
    }
}


export async function getBookingHistory(req, res) {
    try {

        if (!req.user) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        let bookings;

        
        if (req.user.role === "ADMIN" || req.user.role === "HOD") {

            bookings = await Booking.find()
                .populate("lecturer", "firstName lastName email role")
                .populate({
                    path: "timeSlot",
                    populate: {
                        path: "hall",
                        select: "name capacity"
                    }
                })
                .sort({ createdAt: -1 });
        }

        
        else if (req.user.role === "LECTURER") {

            bookings = await Booking.find({
                lecturer: req.user._id
            })
                .populate({
                    path: "timeSlot",
                    populate: {
                        path: "hall",
                        select: "name capacity"
                    }
                })
                .sort({ createdAt: -1 });
        }

        
        else if (req.user.role === "STUDENT") {

            bookings = await Booking.find({
                status: "APPROVED"
            })
                .populate({
                    path: "timeSlot",
                    populate: {
                        path: "hall",
                        select: "name capacity"
                    }
                })
                .sort({ createdAt: -1 });
        }

        else {
            return res.status(400).json({
                message: "Invalid role"
            });
        }

        return res.status(200).json(bookings);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching booking history",
            error: error.message
        });
    }
}