const express = require("express");
const users = require('./MOCK_DATA.json');
const app = express();
const port = 8000;

// Routes
app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}  // map function to get the usernames from the users obj..
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
app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);               // req.params.id -> for to get the id from the url
    const user = users.find((user) => user.id === id); // if the userid = id then it will give give the user obj
    return res.json(user)                           // it send the data in json format of the user...
}).patch((req, res) => {
    // edit the user with id 
    return res.json({ status: pending });
})
.delete((req, res) => {
    // delete the user with id.
    return res.json({ status: pending });
})

app.listen(port, () => console.log('server started...'));