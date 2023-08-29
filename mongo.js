const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/admin")
.then(() => {
    console.log("mongodb connected");
})
.catch(() => {
    console.log("Failed");
})

const newSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const testSchema = new mongoose.Schema({
    test_name:{
        type: String,
        required: true
    },
    test_author:{
        type: String,
        required: true
    },
    no_of_questions:{
        type: Number,
        required: true
    }
});

const question = new mongoose.Schema({
    test_name:{
        type: String,
        required: true
    },
    qno:{
        type: Number,
        required: true
    },
    question:{
        type: String,
        required: true
    },
    option:{
        type: String,
        required: true
    }
});

const user_detail = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const collection = mongoose.model("collection", newSchema);
const test_data = mongoose.model("test_data", testSchema);
const questions = mongoose.model("questions", question);
const user_details = mongoose.model("user_details", user_detail);

module.exports = { collection, test_data, questions, user_details }