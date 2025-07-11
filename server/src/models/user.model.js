import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
            'Please enter a valid email address'
            ] 
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 10
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 10
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 15
        },
        profilePicture: {
            type: String,
            default: "https://i.ibb.co/6nq1z5H/no-avatar.png",
        },
        bannerImage: {
            type: String,
            default: "https://i.ibb.co/6nq1z5H/no-avatar.png",
        },
        bio: {
            type: String,
            trim: true,
            maxlength: 160,
        },
        location: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        followers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
        },
        following: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
        },
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);
export default User;