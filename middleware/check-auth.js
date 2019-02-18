const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {

try {

    

    jwt.verify(req.headers.authorization,'thisissecretkeyanditisverylong')
    next();   
}

catch(error) {
console.log(error)
}

}