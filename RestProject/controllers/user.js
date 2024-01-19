const User = require('../models/user');

async function handleToGetAllUser(req, res) {
    const allUser = await User.find({})
    // custom http header , we use X for custom headers 
    // res.setHeader("X-myName", "Shagun")
    return res.json(allUser);
};

async function handleGetUserById(req, res) {
    // const id = Number(req.params.id);  
    const user = await User.findById(req.params.id)
    // req.params.id -> for to get the id from the url
    // const user = allUser.find((user) => user.id === id); if the userid = id then it will give give the user obj
    if (!user) {
        return res.status(404).json({ error: 'user not found' })
    };
    return res.json(user)                           // it send the data in json format of the user...    
}
async function handleUpdateUserById(req, res) {
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id, { firstName: body.first_name, lastName: body.last_name, email: body.email, gender: body.gender, jobTitle: body.job_title });
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

}

async function handleDeleteUserById(req, res) {
    // delete the user with id.
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "user is deleted." });

    // const id = Number(req.params.id);
    // const userindex = users.findIndex((user) => user.id === id);
    // const deluser = users.splice(userindex, 1)[0];

    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.json({ status: 'success', deleteuser: deluser }); 
    // })  
}

async function handleCreateNewUser(req, res) {

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
    return res.status(201).json({ msg: 'success', id: result._id });
}

module.exports = {
    handleToGetAllUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}