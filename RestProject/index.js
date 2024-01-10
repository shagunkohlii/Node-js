const express = require("express");
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const exp = require("constants");
const app = express();
const port = 8000;



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
app.get('/api/users', (req, res) => {
    // custom http header , we use X for custom headers 
    res.setHeader("X-myName", "Shagun")
    return res.json(users);
})

app.get('/users', (req, res) => {
    const html = `
    <ul>
    // map function to get the usernames from the users obj..
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")} 
    </ul>`;
    res.send(html);
})

app.get("/userlast", (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.last_name}</li>`).join("")}    // join method used for to give the data 
    </ul>                                                           // in as single string for example without any (,)
    `;
    res.send(html);
})

// route is used to group method if the url address is same.
app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);               // req.params.id -> for to get the id from the url
        const user = users.find((user) => user.id === id); // if the userid = id then it will give give the user obj
        if(!user){
            return res.status(404).json({error:'user not found'})
        };
        return res.json(user)                           // it send the data in json format of the user...
    })
    .patch((req, res) => {
        const getId = Number(req.params.id);
        const body = req.body;

        // Find the index of the user in the array
        const userIndex = users.findIndex((user) => user.id === getId);

        const getUser = users[userIndex];
        const updateUser = { ...getUser, ...body };

        users[userIndex] = updateUser;

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: 'success', updateUser: updateUser });
        })
    })
    .delete((req, res) => {
        // delete the user with id.
        const id = Number(req.params.id);
        const userindex = users.findIndex((user) => user.id === id);
        const deluser = users.splice(userindex, 1)[0];

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: 'success', deleteuser: deluser });
        })
    })

// create user 
app.post("/api/users", (req, res) => {
    const body = req.body;

    if(!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title ){
        return res.status(400).json({msg:'all fields are required'});
    }
    users.push({ ...body, id: users.length + 1 });
     
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status: "success", id: users.length })
    });
})

app.listen(port, () => console.log('server started...'));