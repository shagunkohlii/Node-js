const express = require("express");
const fs = require('fs');
const mongoose = require('mongoose')
// const users = require('./MOCK_DATA.json');
const exp = require("constants");
const app = express();
const port = 8000;

// connection mongo 
mongoose.connect('mongodb://127.0.0.1:27017/nodejs-learning')
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("mongo error", err));

// schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
},
    // timestamps shows the created and updated time of a user.
    { timestamps: true })

const User = mongoose.model("user", userSchema);

// middleware plugin 
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use((req, res, next) => {
    console.log("hello froom middleware 1");
    next();
});
app.use((req, res, next) => {
    console.log("hello from middleware 2");
    next();
})

// Routes
app.get('/api/users', async (req, res) => {
    const allUser = await User.find({})
    // custom http header , we use X for custom headers 

    res.setHeader("X-myName", "Shagun")
    return res.json(allUser);
})

app.get('/users', async (req, res) => {
    const allUser = await User.find({})
    // map function to get the usernames and email from the users obj..
    const html = `
    <ul>   
    ${allUser.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")} 
    </ul>`;
    res.send(html);
})

app.get("/userlast", async (req, res) => {
    const allUser = await User.find({})
    // join method used for to give the data in as single string for example without any (,)
    const html = `
    <ul>
    ${allUser.map((user) => `<li>${user.lastName}</li>`).join("")}   
    </ul>                                                           
    `;
    res.send(html);
})

// route is used to group method if the url address is same.
app.route("/api/users/:id")
    .get(async (req, res) => {
        // const id = Number(req.params.id);  
        const user = await User.findById(req.params.id)
        // req.params.id -> for to get the id from the url
        // const user = allUser.find((user) => user.id === id); if the userid = id then it will give give the user obj
        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        };
        return res.json(user)                           // it send the data in json format of the user...
    })
    .patch(async (req, res) => {
        const body = req.body;
        await User.findByIdAndUpdate(req.params.id, { firstName : body.first_name, lastName : body.last_name, email : body.email, gender : body.gender, jobTitle : body.job_title});
        res.json({ msg: 'success' });

        // const getId = Number(req.params.id);
        // Find the index of the user in the array
        // const userIndex = users.findIndex((user) => user.id === getId);
        // const getUser = users[userIndex];
        // const updateUser = { ...getUser, ...body };
        // users[userIndex] = updateUser;
        // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        //     return res.json({ status: 'success', updateUser: updateUser });
        // })
    })
    .delete(async(req, res) => {
        // delete the user with id.
        await User.findByIdAndDelete(req.params.id);
        res.json({msg : "user is deleted."});

        // const id = Number(req.params.id);
        // const userindex = users.findIndex((user) => user.id === id);
        // const deluser = users.splice(userindex, 1)[0];

        // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        //     return res.json({ status: 'success', deleteuser: deluser }); 
        // })
    })

// create user 
app.post("/api/users", async (req, res) => {
    const body = req.body;

    if (!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title) {
        return res.status(400).json({ msg: 'all fields are required' });
    }
    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({ status: "success", id: users.length })
    // });

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender,
    });

    console.log('result', result);
    return res.status(201).json({ msg: 'success' });
})

app.listen(port, () => console.log('server started...'));