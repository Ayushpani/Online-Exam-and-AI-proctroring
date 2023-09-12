const express = require("express");
const { adminDetail, collection, test_data, questions, user_details } = require("./mongo")
const cors =require("cors");
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get("/", cors(), (req, res) => {

})

app.post("/adminLogin", async(req, res) => {
    const { email, password } = req.body;

    try{
        const admin = await adminDetail.findOne({email: email});
        if (admin) {
            if (admin.password == password) {
                res.json("admin valid");
            }
            else{
                res.json("wrong password");
            }
        }
        else{
            res.json("no admin");
        }
    }
    catch(e){
        console.log(e);
    }
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
    const{test_name, test_author, author_email, no_of_questions} = req.body

    const data = {
        test_name: test_name,
        test_author: test_author,
        author_email: author_email,
        no_of_questions: no_of_questions
    }

    try{
        const check = await test_data.findOne({test_name: test_name})

        if(check){
            res.json("exist")
        }
        else{
            const check1 = await collection.findOne({email: author_email});
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
    const {email} = req.body;
    try{
        const tests = await test_data.find({$or: [{ author_email: email }, { other_contributors: email }]});
        if (tests){
            res.json(tests)
        }
        else{
            res.json("no test");
        }
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

app.post("/Home/addQuestions/deleteTest", async(req, res) => {
    const {test_name} = req.body;
    try{
        const ans = await questions.deleteMany({test_name: test_name});
        const ans1 = await test_data.deleteOne({test_name: test_name});
        if(ans, ans1){
            res.json("Test deleted");
        }
        else{
            res.json("Not deleted");
        }
    }
    catch(e){
        console.log(e);
    }
})

app.post("/Home/addQuestions/author", async(req, res) =>{
    const {test_name} = req.body;
    try{
        const ans = await test_data.findOne({test_name: test_name})
        if(ans){
            const author_email = ans ? ans.author_email : 'User not found';
            res.json(author_email);
        }
        else{
            res.json("No such test");
        }
    }
    catch(e){
        console.log(e);
    }
})

app.post("/Home/addQuestions/addContributor", async(req, res) => {
    const {test_name, newContributor} = req.body;
    try{
        const check = await collection.findOne({ email: newContributor });
        if (check) {
            const document = await test_data.findOne({ test_name: test_name });
            if (document) {
                document.other_contributors.push(newContributor)
                await document.save();
                res.json("successful");
            }
            else{
                res.json("unsuccessful");
            }
        }
        else{
            res.json("invalid");
        }
    }
    catch(e){
        console.log(e);
    }
})

app.post("/Home/addQuestions/contributors", async(req, res) => {
    const {test_name} = req.body;
    try{
        const test = await test_data.findOne({ test_name: test_name });
        if (test) {
            const contributors = test ? test.other_contributors : "Test not found";
            res.json(contributors);
        }
        else{
            res.json("no test");
        }
    }
    catch(e){
        console.log(e);
    }
})

app.post("/user/Signup", async(req, res) => {
    const {name, email, dob, password} = req.body;
    const data = {
        name: name,
        email: email,
        dob: dob,
        password: password
    }
    try{
        const check = await user_details.findOne({email: email});
        if(check){
            res.json("exists")
        }
        else{
            res.json("not exists")
            user_details.insertMany([data])
        }
    }
    catch(e){
        console.log(e);
    }
})

app.post("/user/Signin", async(req, res) => {
    const{email, password} = req.body

    try{
        const check = await user_details.findOne({email: email});
        
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

app.listen(8000, () => {
    console.log("Port Connected");
})
