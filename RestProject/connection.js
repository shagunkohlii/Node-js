const mongoose = require('mongoose')


// connection mongo 
async function mongoConnect(url){
    return mongoose.connect(url);
    
}
module.exports={
    mongoConnect,
}

// mongoose.connect('mongodb://127.0.0.1:27017/nodejs-learning')
//     .then(() => console.log("mongodb connected"))
//     .catch((err) => console.log("mongo error", err));