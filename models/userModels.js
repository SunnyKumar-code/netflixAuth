const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);  //extra layer of security
    const cipherTextPassword = await bcrypt.hash(this.password, salt)
    this.password = cipherTextPassword
})

const users = mongoose.model("viewers", userSchema)

module.exports = users