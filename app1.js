const express = require("express");
const { collection, test_data, questions } = require("./mongo")
const cors =require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get("/", cors(), (req, res) => {

})

app.post("/admin", async(req, res) => {
    const data = await collection.find();
    try{
        res.json(data)
    }
    catch(e){
        res.json("no user");
    }
})

app.post("/admin/delete", async(req, res) => {
    const {email} = req.body
    try{
        await collection.deleteOne({email: email});
        res.json("deleted successfully");
    }
    catch(e){
        console.log(e);
    }
})

app.post("/admin/add", async(req, res) => {
    const{name, email, password} = req.body

    const data = {
        name: name,
        email: email,
        password: password
    }

    try{
        const check = await collection.findOne({email: email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("not exist")
            await collection.insertMany([data])
        }
    }
    catch(e){
        res.json("not exist")
    }

})

app.post("/Login", async(req, res) => {
    const{name,email, password} = req.body

    try{
        const check = await collection.findOne({email: email});

        if(check){
            const password_check = check ? check.password : 'User not found';
            if(password_check == password){
                res.json("exists");
            }
            else{
                res.json("incorrect password");
            }
        }
        else{
            res.json("not exist")
        }
    }
    catch(e){
        res.json("not exist")
    }

})

app.post("/Home/newTest", async(req, res) => {
    const{test_name, test_author, no_of_questions} = req.body

    const data = {
        test_name: test_name,
        test_author: test_author,
        no_of_questions: no_of_questions
    }

    try{
        const check = await test_data.findOne({test_name: test_name})

        if(check){
            res.json("exist")
        }
        else{
            const check1 = await collection.findOne({name: test_author});
            if(check1){
                res.json("not exist")
                await test_data.insertMany([data])
            }
            else{
                res.json("Wrong username")
            }
        }
    }
    catch(e){
        res.json("not exist")
    }

})

app.post("/Home/existingTest", async(req, res) => {
    const data = await test_data.find({});
    try{
        res.json(data)
    }
    catch(e){
        res.json("not exist")
    }

})

app.post("/Home/addQuestions", async(req, res) => {
    const{test_name, qno, question, option} = req.body
    const data = {
        test_name: test_name,
        qno: qno,
        question: question,
        option: option
    }
    try{
        await questions.insertMany([data])
    }
    catch(e){
        console.log(e);
    }
})

app.post("/Home/addQuestions/questions", async(req, res) => {
    const {test_name} = req.body
    const data = await questions.find({test_name: test_name});
    try{
        res.json(data)
    }
    catch(e){
        res.json("not exist")
    }

})

app.post("/Home/addQuestions/delete", async(req, res) => {
    const {test_name, qn} = req.body
    try{
        const ans = await questions.deleteOne({test_name: test_name, qno: qn})
        if(ans.deletedCount == 1){
            res.json("Record deleted");
        }
    }
    catch(e){
        console.log(e);
        
    }
})

app.listen(8000, () => {
    console.log("Port Connected");
})
