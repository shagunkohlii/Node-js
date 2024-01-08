function greet(name){
    console.log(`hello, ${name}`)
}
const pi = 3.14;
class Myconstructor {
    constructor(name, classes) {
        console.log(`my name is ${name}, and im in class ${classes}`)
    }
}
// export.module{greet}
module.exports = {greet:greet, pi:pi, person:Myconstructor};