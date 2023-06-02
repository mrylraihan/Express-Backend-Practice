const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [5, "Password must be 5 characters or longer"],
        },
    },
    { timestamps: true }
);


UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords Must Match");
    }
    next();
});

UserSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 7);
    next();
})

const User = mongoose.model("User", UserSchema);

module.exports = User;