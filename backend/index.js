import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";
import hallRouter from "./routers/hallRouter.js";
import bookingRouter from "./routers/bookingRouter.js";
import notificationRouter from "./routers/notificationRouter.js";
import slotGeneratorRouter from "./routers/slotGeneratorRouter.js";
import dashboardRouter from "./routers/dashboardRouter.js";
import lectureHallRouter from "./routers/lectureHallRouter.js";

const app = express();

const mongodbURI = "mongodb+srv://admin:1234@cluster0.gaxxh4u.mongodb.net/com_department?retryWrites=true&w=majority";


mongoose.connect(mongodbURI, {
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log("Connected to MongoDB");

    
    app.listen(3000, () => {
        console.log("Server started on http://localhost:3000");
    });

})
.catch((err) => {
    console.error("MongoDB connection failed:", err);
});


// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(authenticateUser);

// Routes
app.use("/users", userRouter);
app.use("/halls", hallRouter);
app.use("/bookings", bookingRouter);
app.use("/notifications", notificationRouter);
app.use("/generate-slots", slotGeneratorRouter);
app.use("/dashboard", dashboardRouter);
app.use("/lecture-halls", lectureHallRouter);