let jwt = require('jsonwebtoken');
// const config = require('./config.js');
let user = require('./authenticate');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    jwt.verify(token, 'prnv', (err, decoded) => {
      if (err) {
        console.log("erroe here");
        //  res.json({ status: 401, error: { message: 'Unauthorised' } });
        let err = new Error('unautherize');
        err.status = 401;
        throw err;
      }
      else {
        if (user.user != undefined) {
          if ((user.user.username == decoded.username) && (user.user.password == decoded.password)) {
            req.decoded = decoded;
                  next();
          }
          else {
            console.log("bbbb")
            let err = new Error('unautherize');
            err.status = 401;
            res.status(err.status || 500);
            res.json({
              error: {
                status: 401,
                massage: err.message
              }
            });
          }
        }
        else {
          console.log("ddddd")
          let err = new Error('unautherize');
          err.status = 401;
          res.status(err.status || 500);``
          res.json({
            error: {
              status: 401,
              massage: err.message
            }
          });
        }
      }
    });
  } else {
    console.log("erroe here123");
    let err = new Error('noToken');
    err.status = 111;
    throw err;
  }
};

module.exports = {
  checkToken: checkToken
} 