const mongoose = require("mongoose");


const TodoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    { timestamps: true }
);



const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;