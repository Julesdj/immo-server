import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";

const { Schema } = mongoose;
const jwt = jsonwebtoken;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            min: 5,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        city: String,
        state: String,
        country: String,
        occupation: String,
        phoneNumber: String,
        transactions: Array,
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "user",
        },
    },
    { timestamps: true }
);

//Add Generate authentication token method to the user model
UserSchema.methods.generateAuthnToken = function () {
    const jwtPrivateKey = process.env.jwtPrivateKey;

    if (!jwtPrivateKey) {
        console.error("FATAL ERROR: jwtPrivateKey is not defined"); //TO BE removed
        return res
            .status(500)
            .send(
                "Oops, something went wrong. I'ts not your fault, please try again later"
            );
    }

    const token = jwt.sign(
        {
            _id: this._id,
            role: this.role,
            name: this.name,
        },
        jwtPrivateKey
    );

    return token;
};

//   USER MODEL
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
