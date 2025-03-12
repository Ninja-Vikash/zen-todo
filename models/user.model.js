import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
});

const UserModel = mongoose.models.users || mongoose.model("user", userSchema);

export default UserModel;
