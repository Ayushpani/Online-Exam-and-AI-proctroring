const express = require("express");
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const treeKill = require('tree-kill');
const { adminDetail, collection, test_data, questions, user_details } = require("./mongo")
const cors = require("cors");
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get("/", cors(), (req, res) => {

})

let proctor_data = null;
let resume = 0;

app.post('/test/check', async (req, res) => {
    exec('python pyScripts/first.py', (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            res.json("error");
        }
        else {
            res.json("executed");
        }
    });
});

app.post('/test/kill', async (req, res) => {
    const pyProcesses = 'tasklist | findstr "python"';
    exec(pyProcesses, (error, stdout) => {
        if (error) {
            res.json("error listing");
        }
        const processList = stdout.split('\n');
        processList.forEach((processInfo) => {
            const match = processInfo.match(/\d+/);
            if (match) {
                const pid = match[0];
                console.log(`Killing python process with PID ${pid}`);
                treeKill(pid, 'SIGTERM', (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        check = 1;
                        console.log(`Process with pid ${pid} killed successfully`);
                    };
                })
            }
        })
        res.json('killed');
    });
});

app.post("/test/fetchQuestions", async (req, res) => {
    const { test_name } = req.body;

    try {
        const question_data = await questions.find({ test_name: test_name });
        if (question_data) {
            res.json(question_data)
        }
        else {
            res.json("no question")
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/test/proctor", async (req, res) => {
    const detectedObjects = req.body;
    proctor_data = detectedObjects;
    res.status(200).json({ message: 'Object detection data received' });
});

app.post("/test/proctor_data", async (req, res) => {
    res.json(proctor_data);
    proctor_data = null;
})

app.post("/test/proctoring", async (req, res) => {
    exec('python pyScripts/headless.py', (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            res.json("error");
        }
        else {
            res.json("executed");
        }
    });
})

app.post("/test/optionsData", async (req, res) => {
    const { test_name } = req.body;
    try {
        const check = await questions.find({ test_name: test_name });
        if (check) {
            let options = Array(check.length).fill('o');
            check.forEach((doc, index) => {
                options[index] = doc.option;
            })
            res.json(options);
        }
        else {
            res.json("no test");
        }
    }
    catch(e) {
        console.log(e);
    }
})

app.post("/resume/response", async (req, res) => {
    resume = req.body;
})

app.post("/resume/pythonResponse", async (req, res) => {
    res.status(200).json({ resume })
    resume = 0
})

app.post("/adminLogin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminDetail.findOne({ email: email });
        if (admin) {
            if (admin.password == password) {
                res.json("admin valid");
            }
            else {
                res.json("wrong password");
            }
        }
        else {
            res.json("no admin");
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/admin", async (req, res) => {
    const data = await collection.find();
    try {
        res.json(data)
    }
    catch (e) {
        res.json("no user");
    }
})

app.post("/admin/delete", async (req, res) => {
    const { email } = req.body
    try {
        await collection.deleteOne({ email: email });
        res.json("deleted successfully");
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/admin/add", async (req, res) => {
    const { name, email, password } = req.body

    const data = {
        name: name,
        email: email,
        password: password
    }

    try {
        const check = await collection.findOne({ email: email })

        if (check) {
            res.json("exist")
        }
        else {
            res.json("not exist")
            await collection.insertMany([data])
        }
    }
    catch (e) {
        res.json("not exist")
    }

})

app.post("/Login", async (req, res) => {
    const { name, email, password } = req.body

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            const password_check = check ? check.password : 'User not found';
            if (password_check == password) {
                res.json("exists");
            }
            else {
                res.json("incorrect password");
            }
        }
        else {
            res.json("not exist")
        }
    }
    catch (e) {
        res.json("not exist")
    }

})

app.post("/Home/newTest", async (req, res) => {
    const { test_name, test_author, author_email, no_of_questions } = req.body

    const data = {
        test_name: test_name,
        test_author: test_author,
        author_email: author_email
    }

    try {
        const check = await test_data.findOne({ test_name: test_name })

        if (check) {
            res.json("exist")
        }
        else {
            const check1 = await collection.findOne({ email: author_email });
            if (check1) {
                res.json("not exist")
                await test_data.insertMany([data])
            }
            else {
                res.json("Wrong username")
            }
        }
    }
    catch (e) {
        res.json("not exist")
    }

})

app.post("/Home/existingTest", async (req, res) => {
    const { email } = req.body;
    try {
        const tests = await test_data.find({ $or: [{ author_email: email }, { other_contributors: email }] });
        if (tests) {
            res.json(tests)
        }
        else {
            res.json("no test");
        }
    }
    catch (e) {
        res.json("not exist")
    }

})

app.post("/Home/fetchTest", async (req, res) => {
    const { email } = req.body;
    try {
        const tests = await test_data.find({});
        if (tests) {
            res.json(tests)
        }
        else {
            res.json("no test");
        }
    }
    catch (e) {
        res.json("not exist")
    }

})

app.post("/Home/addQuestions", async (req, res) => {
    const { test_name, qno, question, option } = req.body
    const data = {
        test_name: test_name,
        qno: qno,
        question: question,
        option: option
    }
    try {
        const test = await test_data.findOne({ test_name: test_name });
        if (test) {
            await test_data.updateOne({ test_name: test_name }, { $inc: { no_of_questions: 1 } });
            await questions.insertMany([data])
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/Home/addQuestions/questions", async (req, res) => {
    const { test_name } = req.body
    const data = await questions.find({ test_name: test_name });
    try {
        res.json(data)
    }
    catch (e) {
        res.json("not exist")
    }

})

app.post("/Home/addQuestions/delete", async (req, res) => {
    const { test_name, qn } = req.body
    try {
        const ans = await questions.deleteOne({ test_name: test_name, qno: qn })
        if (ans.deletedCount == 1) {
            res.json("Record deleted");
        }
    }
    catch (e) {
        console.log(e);

    }
})

app.post("/Home/addQuestions/deleteTest", async (req, res) => {
    const { test_name } = req.body;
    try {
        const ans = await questions.deleteMany({ test_name: test_name });
        const ans1 = await test_data.deleteOne({ test_name: test_name });
        if (ans, ans1) {
            res.json("Test deleted");
        }
        else {
            res.json("Not deleted");
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/Home/addQuestions/author", async (req, res) => {
    const { test_name } = req.body;
    try {
        const ans = await test_data.findOne({ test_name: test_name })
        if (ans) {
            const author_email = ans ? ans.author_email : 'User not found';
            res.json(author_email);
        }
        else {
            res.json("No such test");
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/Home/addQuestions/addContributor", async (req, res) => {
    const { test_name, newContributor } = req.body;
    try {
        const check = await collection.findOne({ email: newContributor });
        if (check) {
            const document = await test_data.findOne({ test_name: test_name });
            if (document) {
                document.other_contributors.push(newContributor)
                await document.save();
                res.json("successful");
            }
            else {
                res.json("unsuccessful");
            }
        }
        else {
            res.json("invalid");
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/Home/addQuestions/deleteContributors", async (req, res) => {
    const { test_name, toDelete } = req.body;
    try {
        const test = await test_data.findOne({ test_name: test_name });
        if (test) {
            const document = await test_data.findOne({ $and: [{ test_name: test_name }, { other_contributors: toDelete }] });
            if (document) {
                await test_data.updateOne({ test_name: test_name }, { $pull: { other_contributors: toDelete } });
                res.json("removed");
            }
            else {
                res.json("no contributor");
            }
        }
        else {
            res.json("no test");
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/Home/addQuestions/contributors", async (req, res) => {
    const { test_name } = req.body;
    try {
        const test = await test_data.findOne({ test_name: test_name });
        if (test) {
            const contributors = test ? test.other_contributors : "Test not found";
            res.json(contributors);
        }
        else {
            res.json("no test");
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/user/Signup", async (req, res) => {
    const { name, email, dob, password } = req.body;
    const data = {
        name: name,
        email: email,
        dob: dob,
        password: password
    }
    try {
        const check = await user_details.findOne({ email: email });
        if (check) {
            res.json("exists")
        }
        else {
            res.json("not exists")
            user_details.insertMany([data])
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/user/Signin", async (req, res) => {
    const { email, password } = req.body

    try {
        const check = await user_details.findOne({ email: email });

        if (check) {
            const password_check = check ? check.password : 'User not found';
            if (password_check == password) {
                res.json("exists");
            }
            else {
                res.json("incorrect password");
            }
        }
        else {
            res.json("not exist")
        }
    }
    catch (e) {
        res.json("not exist")
    }

})

app.listen(8000, () => {
    console.log("Port Connected");
})
