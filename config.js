"Use strict";

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const{
    HOST,
    PORT,
    HOST_URL,
    SQL_SERVER,
    SQL_DATABASE,
    SQL_USER,
    SQL_PASSWORD,
   
}= process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true" ;

assert(PORT, "PORT is required"); 
assert(HOST, "HOST is required"); 

module.exports={
    port: PORT,
    host: HOST,
    url: HOST_URL,
    appIdprod:"24696724a929c2bf5b3c4824e3769642",
    secretKeyprod:"483fb8451331fcafd640fdb03d48980407358f83",
    appIdtest:"1985385567e2aa4b20c4631892835891",
    secretKeytest:"1601ded4c81968198ffc71ab6b007d3e8f47a240",
    cashfreeTestUrl:'sandbox.cashfree.com',
    cashfreeProdUrl:'api.cashfree.com',

    // appId:"1985385567e2aa4b20c4631892835891",
    // secretKey:"1601ded4c81968198ffc71ab6b007d3e8f47a240",
    sql:{
        server: SQL_SERVER ,
        database: SQL_DATABASE , 
        user : SQL_USER , 
        password: SQL_PASSWORD,
        options:{
            encrypt: sqlEncrypt , 
            enableArithAbort: true
        }
    },
 
}