import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    timeSlot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        default: "PENDING"
    },
    cancelledAt: {
        type: Date,
        default: null
    }
},{ timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;