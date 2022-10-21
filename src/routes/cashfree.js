const express = require("express");
const router = express.Router();
const db = require("../db/db");
const multer = require('multer');
const path = require('path');
const config = require("../../config");
var midway = require('./midway');
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
const request = require('request');
const http = require('https');

router.post("/createCashfreeOrder",(req,res,next)=>{
    console.log('testing' ,JSON.stringify(req.body))

    // const options = {
    //     method: 'POST',
    //     url: 'https://api.cashfree.com/pg/orders',
    //     headers: {
    //         'accept': 'application/json',
    //         'x-client-id': config.appId,
    //         'x-client-secret': config.secretKey,
    //         'x-api-version': '2022-01-01',
    //         'content-type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //         'Authorization':'Bearer '+config.secretKey,
    //         'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    //     },
    //     body: {"order_amount":71189,"order_currency":"INR","customer_details":{"customer_id":"1","customer_email":"ptlshubham@gmail.com","customer_phone":"7016441159"}},
    //     json: true
    //   };
      
    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);
      
    //     console.log("sucess",body);
    // });




    const options = {
        method: 'POST',
        hostname: config.cashfreeProdUrl,
        port: null,
        path: '/pg/orders',
        headers: {
          'x-api-version': '2022-01-01',
          'content-type': 'application/json',
          'Accept':'application/json',
          'x-client-id': config.appIdprod,
          'x-client-secret': config.secretKeyprod,
          'Authorization':'Bearer'+config.secretKeyprod,
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
        },
        body: JSON.stringify(req.body),
      };
      
      const reqs = http.request(options, function (resp) {
        const chunks = [];
      
        resp.on('data', function (chunk) {
            console.log(chunk);
          chunks.push(chunk);
        });
      
        resp.on('end', function () {
          const body = Buffer.concat(chunks);
          console.log(body.toString());
          res.json(body.toString())
        });
      });
      reqs.write(JSON.stringify(req.body));

      
      reqs.end();
})


module.exports = router;