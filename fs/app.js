// console.log("hello from node js")
const fs = require('fs')
const tutorial = require("./tutorial")
const os = require('os');
// tutorial.greet("shagun")
// console.log(tutorial.pi + 123)

console.log(new tutorial.person('shagun', 3))

// writeFile for creating file 
// fs.writeFile("./tests.js", "hello shagun best of luck for your programming journey", (err) => { });

// fs.writeFileSync("./syncfile.txt", "what are you doing ggjgjkjkho")
// fs.readFile("test.js", "utf-8", (err,data)=>{
//     if(err){
//         console.log("error", err)
//     }
//     else{
//     console.log(data)
// }
// })
// asynchronous function readfilesync
// const readdata = fs.readFileSync("./test.js", "utf-8", (err) => {});
// console.log(readdata)

// this existsSync is used to check if the folder is already exists or not
if (fs.existsSync("./tests.js")) {
    console.log("file exists")
}
else {
    console.log("file doesn't exists")
}

// append file is to add data at the end of the file 
const dataappend = `hello there whats up nodiee123\n`;

// fs.appendFile("./test.js", dataappend, (err) => {
//     if (err) {
//         console.log("unsuccessfull", err);
//     }
//     else {
//         console.log("successfull")
//     }
// })
console.log(os.cpus().length)  //check the cores


// fs.appendFileSync("./contacts.txt", `${Date.now()}\n`)
// fs.appendFileSync("./contacts.txt", dataappend)


// cpSync is to copy from one file to another
// fs.cpSync("./test.js", "./contact.txt")

// asynchronous cp
// fs.cp("./test.js" , "./contact.txt", (err)=>{
//     if(err) throw err;
// })

// to delete file we use unlink
// fs.unlinkSync("./package.json")

// to check the stats of a file we use statSync
// console.log(fs.statSync("./contact.txt"))

// to make a directory/folder we use mkdir
// fs.mkdirSync("./donkeykong/a/b",{ recursive: true})