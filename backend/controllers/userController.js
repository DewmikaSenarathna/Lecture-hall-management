import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// ================= CREATE USER =================
export async function createUser(req, res) {
    try {

        const { firstName, lastName, email, username, password } = req.body;

        // 🔥 Basic validation
        if (!firstName || !email || !username || !password) {
            return res.status(400).json({
                message: "All required fields must be filled"
            });
        }

        // 🔥 Check existing email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // 🔥 Check existing username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                message: "Username already taken"
            });
        }

        // 🔥 Hash password safely
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName: lastName || "",
            email,
            username,
            password: passwordHash,
            role: "PENDING"
        });

        await newUser.save();

        return res.status(201).json({
            message: "Account created. Waiting for admin approval."
        });

    } catch (error) {

        console.log("CREATE USER ERROR:", error); // 🔥 IMPORTANT LOG

        // Handle duplicate index crash (Mongo error 11000)
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Duplicate field value detected"
            });
        }

        return res.status(500).json({
            message: error.message || "Error creating user"
        });
    }
}


// ================= LOGIN USER =================
export async function loginUser(req, res) {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        if (user.role === "PENDING") {
            return res.status(403).json({
                message: "Account awaiting admin approval"
            });
        }

        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || "lecturehallmanagement",
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            role: user.role,
            username: user.username
        });

    } catch (error) {

        console.log("LOGIN ERROR:", error); // 🔥 IMPORTANT LOG

        return res.status(500).json({
            message: error.message || "Server error during login"
        });
    }
}


// ================= UPDATE USER ROLE =================
export async function updateUserRole(req, res) {
    try {

        if (!req.user || req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        const { role } = req.body;

        const allowedRoles = ["STUDENT", "LECTURER", "HOD", "ADMIN"];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                message: "Invalid role value"
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.role = role;
        await user.save();

        return res.status(200).json({
            message: "User role updated successfully"
        });

    } catch (error) {

        console.log("UPDATE ROLE ERROR:", error);

        return res.status(500).json({
            message: error.message || "Error updating user role"
        });
    }
}


// ================= GET PENDING USERS =================
export async function getPendingUsers(req, res) {
    try {

        if (!req.user || req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        const users = await User.find({ role: "PENDING" })
            .select("firstName lastName email username role createdAt");

        return res.status(200).json(users);

    } catch (error) {

        console.log("GET PENDING USERS ERROR:", error);

        return res.status(500).json({
            message: error.message || "Error fetching pending users"
        });
    }
}