const express = require('express');
const { handleToGetAllUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = require('../controllers/user')
// express routers
const router = express.Router();

// Routes
// '/api/users'
// create user 
router.route('/')
    .get(handleToGetAllUser)
    .post(handleCreateNewUser);


// router.get('/users', async (req, res) => {
//     const allUser = await User.find({})
//     // map function to get the usernames and email from the users obj..
//     const html = `
//     <ul>   
//     ${allUser.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")} 
//     </ul>`;
//     res.send(html);
// })

// router.get("/userlast", async (req, res) => {
//     const allUser = await User.find({})
//     // join method used for to give the data in as single string for example without any (,)
//     const html = `
//     <ul>
//     ${allUser.map((user) => `<li>${user.lastName}</li>`).join("")}   
//     </ul>                                                           
//     `;
//     res.send(html);
// })

// route is used to group method if the url address is same.
router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)


module.exports = router;