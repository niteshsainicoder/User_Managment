import {UserSchema} from "../models/User.models.js"; // Import the correct model

// Create UserSchema
export const createUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const newUser = await UserSchema.create({ name, email, role: role || "user" });
        if (!newUser) {
            return res.status(500).json({ message: "User Not Created" });
        }

        return res.status(201).json({ message: "User Created", user: newUser });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update User
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, role } = req.body;

        const user = await UserSchema.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        if (!name && !email && !role) {
            return res.status(400).json({ message: "Please update at least one field" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        const updatedUser = await user.save();

        return res.status(200).json({ message: "User Updated Successfully", user: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserSchema.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        await UserSchema.findByIdAndDelete(id);

        return res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get Single User
export const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserSchema.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        return res.status(200).json({ message: "User Found", user: user });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get All Users
export const getAllUser = async (req, res) => {
    try {
        const users = await UserSchema.find({});

        if (users.length === 0) {
            return res.status(404).json({ message: "No Users Found" });
        }

        return res.status(200).json({ message: "Users Retrieved", users: users });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};
