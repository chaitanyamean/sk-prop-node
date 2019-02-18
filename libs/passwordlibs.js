const bcrypt = require('bcryptjs');
saltrounds = 10;

let comparePassword = (password, hashpassword, cb) => {

console.log('bcrypt', password,hashpassword)
    bcrypt.compare(password,hashpassword, (err, res) => {
        if(err) {
            cb(err, null)
        } else {
console.log('res', res)

            cb(null, res)
        }
    })
}


module.exports = {
    comparePassword: comparePassword
}