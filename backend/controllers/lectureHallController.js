import LectureHall from "../models/lectureHall.js";


export async function createHall(req, res) {
    try {

        const { name, capacity } = req.body;

        if (!name || !capacity) {
            return res.status(400).json({
                message: "Name and capacity are required"
            });
        }

        const existingHall = await LectureHall.findOne({ name });

        if (existingHall) {
            return res.status(400).json({
                message: "Hall with this name already exists"
            });
        }

        const hall = new LectureHall({
            name,
            capacity
        });

        await hall.save();

        return res.status(201).json({
            message: "Lecture hall created successfully",
            hall
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error creating hall",
            error: error.message
        });
    }
}



export async function getAllHalls(req, res) {
    try {

        const halls = await LectureHall.find();

        return res.status(200).json(halls);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching halls",
            error: error.message
        });
    }
}


// ======================
// UPDATE HALL
// ======================
export async function updateHall(req, res) {
    try {

        const { name, capacity } = req.body;

        const hall = await LectureHall.findById(req.params.id);

        if (!hall) {
            return res.status(404).json({
                message: "Hall not found"
            });
        }

        if (name) hall.name = name;
        if (capacity) hall.capacity = capacity;

        await hall.save();

        return res.status(200).json({
            message: "Hall updated successfully",
            hall
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error updating hall",
            error: error.message
        });
    }
}


// ======================
// DELETE HALL
// ======================
export async function deleteHall(req, res) {
    try {

        const hall = await LectureHall.findById(req.params.id);

        if (!hall) {
            return res.status(404).json({
                message: "Hall not found"
            });
        }

        await hall.deleteOne();

        return res.status(200).json({
            message: "Hall deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error deleting hall",
            error: error.message
        });
    }
}