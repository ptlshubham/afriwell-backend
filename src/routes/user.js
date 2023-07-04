const express = require("express");
const router = express.Router();
const db = require("../db/db");
const multer = require('multer');
const path = require('path');
const config = require("../../config");
var midway = require('./midway');
const jwt = require('jsonwebtoken');


router.post("/SaveUserRegister", (req, res, next) => {
    // bcryt.genSalt(10, function (err, salt) {
    //     bcryt.hash(req.body.password, salt, (err, hash) => {

    //     })
    // })
    console.log(req.body.dateofbirth);
    db.executeSql("INSERT INTO `user`(`firstname`,`middlename`,`lastname`,`email`,`password`,`dateofbirth`,`gender`,`contactnumber`,`isactive`,`createddate`)VALUES('" + req.body.firstname + "','" + req.body.middlename + "','" + req.body.lastname + "','" + req.body.email + "','" + req.body.password + "',CURRENTTIMESTAMP," + req.body.gender + ",'" + req.body.contactnumber + "'," + req.body.isactive + ",CURRENT_TIMESTAMP);", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });

});

router.post("/SaveAddress",midway.checkToken, (req, res, next) => {
    // console.log(req.body);
    db.executeSql("INSERT INTO `useraddress`(`userid`,`name`,`contactnumber`,`pincode`,`locality`,`address`,`city`,`state`,`landmark`,`alternativeno`,`email`,`createddate`)VALUES(" + req.body.userid + ",'" + req.body.name + "'," + req.body.contactnumber + "," + req.body.pincode + ",'" + req.body.locality + "','" + req.body.address + "','" + req.body.city + "','" + req.body.state + "','" + req.body.landmark + "'," + req.body.alternativeno + ",'"+req.body.email+"',CURRENT_TIMESTAMP);", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });

});
router.post("/RemoveUserAddress", midway.checkToken,(req, res, next) => {
    db.executeSql("Delete from useraddress where id=" + req.body.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/UpdateUserAddress",midway.checkToken, (req, res, next) => {
    // console.log(req.body)
    db.executeSql("UPDATE `useraddress` SET name='" + req.body.name + "',contactnumber=" + req.body.contactnumber + ",pincode=" + req.body.pincode + ",locality='" + req.body.locality + "',address='" + req.body.address + "',city='" + req.body.city + "',landmark='" + req.body.landmark + "',alternativeno=" + req.body.alternativeno + ",updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});


router.get("/GetUserAddress/:id",midway.checkToken, (req, res, next) => {
    db.executeSql("select * from useraddress where userid =" + req.params.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/getOrdersForDashboard",midway.checkToken, (req, res, next) => {
    db.executeSql("select o.id,o.username,o.userid,o.addressid,o.productid,o.quantity,o.transactionid,o.modofpayment,o.total,o.status,o.orderdate,o.deliverydate,p.id as productId,p.maintag,p.productName,p.brandName,p.manufacturerName,p.productCode,p.startRating,p.productSRNumber,p.productPrice,p.discountPrice,p.emiOptions,p.avibilityStatus,p.descripition,p.relatedProduct,p.itemWeight,p.isActive,p.mainCategory,p.category,p.subCategory,p.createddate,p.updateddate,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale from orders o join productmaster p on o.productid=p.id where o.userid=" + req.body.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            // return res.json(data);
            if (data.length > 0) {
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where maintag=" + element.maintag, function (data1, err) {
                        if (err) {
                            console.log("Error in store.js", err);
                        } else {
                            element.productMainImage = data1;
                            if (data.length == (ind + 1)) {
                                res.json(data);
                            }
                        }
                    });
                });
            }
        }
    });
});


router.post("/saveAddToCart",(req, res, next) => {
    db.executeSql("INSERT INTO `cartlist`(`userid`,`productid`,`quantity`,`createddate`)VALUES('" + req.body[0].userid + "'," + req.body[0].product.productId + "," + req.body[0].quantity + ",CURRENT_TIMESTAMP);", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });

});
router.post("/UpdateCartDetails",(req, res, next) => {
    db.executeSql("UPDATE `cartlist` SET quantity=" + req.body.quantity + ",updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/saveToWishList",midway.checkToken, (req, res, next) => {
    db.executeSql("INSERT INTO `wishlist`(`userid`,`productid`)VALUES(" + req.body.userid + "," + req.body.id + ");", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });

});
router.post("/saveUserOrders",midway.checkToken, (req, res, next) => {
    // console.log(req.body)
    if (req.body.productid.length == 1) {
        req.body.parentid = 0;
        db.executeSql("INSERT INTO `orders`(`username`, `userid`, `addressid`, `productid`,`quantity`,`size`, `transactionid`, `parentid`, `modofpayment`,`status`,`orderdate`, `deliverydate`, `createddate`, `updateddate`)VALUES('" + req.body.username + "'," + req.body.userid + "," + req.body.addressId + "," + req.body.productid[0].productid + "," + req.body.productid[0].quantity + ",'" + req.body.size + "',null," + req.body.parentid + ",null,'" + req.body.status + "',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);", function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                return res.json(data);
            }
        });
    }
    else {
        req.body.parentid = 0;
        db.executeSql("INSERT INTO `orders`(`username`, `userid`, `addressid`, `productid`,`quantity`, `transactionid`, `parentid`, `modofpayment`,`status`,`orderdate`, `deliverydate`, `createddate`, `updateddate`)VALUES('" + req.body.username + "'," + req.body.userid + "," + req.body.addressId + "," + req.body.productid[0].productid + "," + req.body.productid[0].quantity + ",null," + req.body.parentid + ",null,'" + req.body.status + "',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);", function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                // db.executeSql("select soldquantity from `quantitywithsize` where productid=" + req.body.productid[0].productid + " and size ='" + req.body.productid[0].size + "'", function (data, err) {
                //     if (err) {
                //         console.log("Error in store.js", err);
                //     } else {
                //         if (data[0].soldquantity == null) {
                //             data[0].soldquantity = 0;
                //         }
                //         data[0].soldquantity = data[0].soldquantity + req.body.productid[0].quantity;
                //         console.log("soldded=", req.body.productid[0].quantity);
                //         db.executeSql("update   `quantitywithsize` SET soldquantity=" + data[0].soldquantity + " WHERE productid=" + req.body.productid[0].productid + " and size='" + req.body.productid[0].size + "'", function (data, err) {
                //             if (err) {
                //                 console.log("Error in store.js", err);
                //             } else {
                //                 // return res.json(data);
                //             }
                //         });
                //     }
                // });

                // db.executeSql("SELECT id FROM orders ORDER BY createddate DESC LIMIT 1", function (data1, err) {
                //     if (err) {
                //         console.log("Error in store.js", err);
                //     } else {
                //         req.body.parentid = data1[0].id;
                //         for (let i = 1; i < req.body.productid.length; i++) {
                //             db.executeSql("INSERT INTO `orders`(`username`, `userid`, `addressid`, `productid`,`quantity`, `transactionid`, `parentid`, `modofpayment`,`status`,`orderdate`, `deliverydate`, `createddate`, `updateddate`)VALUES('" + req.body.username + "'," + req.body.userid + "," + req.body.addressId + "," + req.body.productid[i].productid + "," + req.body.productid[i].quantity + ",null," + req.body.parentid + ",null,'" + req.body.status + "',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);", function (data, err) {
                //                 if (err) {
                //                     console.log("Error in store.js", err);
                //                 }
                //                 else {
                //                     db.executeSql("select soldquantity from `quantitywithsize` where productid=" + req.body.productid[i].productid + " and size ='" + req.body.productid[i].size + "'", function (data, err) {
                //                         if (err) {
                //                             console.log("Error in store.js", err);
                //                         } else {
                //                             if (data[0].soldquantity == null) {
                //                                 data[0].soldquantity = 0;
                //                             }
                //                             data[0].soldquantity = data[0].soldquantity + req.body.productid[0].quantity;
                //                             console.log("soldded=", req.body.productid[0].quantity);
                //                             db.executeSql("update   `quantitywithsize` SET soldquantity=" + data[0].soldquantity + " WHERE productid=" + req.body.productid[i].productid + " and size='" + req.body.productid[i].size + "'", function (data, err) {
                //                                 if (err) {
                //                                     console.log("Error in store.js", err);
                //                                 } else {
                //                                     return res.json(data);
                //                                 }
                //                             });
                //                         }
                //                     });

                //                 }
                //             })
                //         }
                //     }
                // });
                return res.json(data);
            }
        });
    }

});
router.get("/GetProductList", (req, res, next) => {
    console.log("here");
    db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name as cat_name from productmaster p join category c on c.id = p.category;", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            if (data.length > 0) {
              
                let test=[];
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where maintag=" + element.maintag, function (data1, err) {
                        if (err) {
                            console.log("Error in store.js", err);
                        } else {
                            if(data1.length>0){
                                element.productMainImage = data1;
                                test.push(element)
                            }
                            // element.productMainImage = data1;
                            if (data.length == (ind + 1)) {
                                res.json(test);
                            }
                        }
                    });
                });
            }
        }
    }); 
});

router.post("/GetSimilarProductList", (req, res, next) => {

    db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name as cat_name from productmaster p join category c on c.id = p.category where p.category=" + req.body.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            if (data.length > 0) {
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where maintag=" + element.maintag, function (data1, err) {
                        if (err) {
                            console.log("Error in store.js", err);
                        } else {
                            element.productMainImage = data1;
                            if (data.length == (ind + 1)) {
                                res.json(data);
                            }
                        }
                    });
                });
            }
        }
    });
});
router.get("/GetStateList", (req, res, next) => {
    db.executeSql("select * from state ", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/GetCategoryList/:id", (req, res, next) => {

    db.executeSql("select * from category where isactive=1 AND parent =" + req.params.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            res.json(data);
        }
    });
});
router.get("/getCatForCategoriesComponent/:id", (req, res, next) => {
    console.log("ghvsghvdcxgvhsdc",req.params.id);
    if(req.params.id=='all'){
    }else{
        db.executeSql("select * from category where isactive=1 and id ="+req.params.id, function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                if(data.length>0){
                    db.executeSql("select * from category where isactive=1 and parent="+data[0].parent,function(data1,err){
                        if(err){
                            console.log(err);
                        }else{
                            res.json(data1)
                        }
                       })
                }
               
            }
        });
    }
});

router.get("/GetProductImages/:id", (req, res, next) => {
    console.log("images from here");
    console.log(req.params.id)
    db.executeSql("select * from images where maintag=" + req.params.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.get("/GetCartList/:id", (req, res, next) => {
    console.log(req.params.id)
    db.executeSql("select cl.id, cl.userid,cl.productid,cl.quantity,p.id as ProductId,p.maintag,p.productName,p.brandName,p.manufacturerName,p.startRating,p.productPrice,p.discountPrice,p.avibilityStatus,p.descripition from cartlist cl join productmaster p on cl.productid=p.id where cl.userid='" + req.params.id + "' ", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            if (data.length > 0) {
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where maintag=" + element.maintag, function (data1, err) {
                        if (err) {
                            console.log("Error in store.js", err);
                        } else {
                            element.productMainImage = data1;
                            if (data.length == (ind + 1)) {
                                res.json(data);
                            }
                        }
                    });
                });
            } else { res.json('empty') }
        }
    });
});


router.get("/GetWishList", (req, res, next) => {
    db.executeSql("select wl.id, wl.userid,wl.productid,p.id as ProductId,p.productName,p.brandName,p.manufacturerName,p.startRating,p.productPrice,p.discountPrice,p.avibilityStatus,p.descripition from wishlist wl join productmaster p on wl.productid=p.id ", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.get("/GetProductDetails/:id", (req, res, next) => {
    db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name as cat_name from productmaster p join category c  on c.id = p.category where p.id =" + req.params.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            if (data.length > 0) {
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where maintag=" + element.maintag, function (data1, err) {
                        if (err) {
                            console.log("Error in store.js", err);
                        } else {
                            element.productMainImage = data1;
                            if (data.length == (ind + 1)) {
                                res.json(data);
                            }
                        }
                    });
                });
            }
        }
    });
});

router.get("/GetBestProduct", (req, res, next) => {
    db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name as cat_name from productmaster p join category c on c.id = p.category  where p.isBestProduct=true", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            if (data.length > 0) {
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where maintag=" + element.maintag, function (data1, err) {
                        if (err) {
                            console.log("Error in store.js", err);
                        } else {
                            element.productMainImage = data1;
                            if (data.length == (ind + 1)) {
                                res.json(data);
                            }
                        }
                    });
                });
            }else{
                let test=[];
                res.json(test);
            }
        }
    });
});

router.get("/GetNewArrivalProduct", (req, res, next) => {
    db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name as cat_name  from productmaster p join category c  on c.id = p.category where p.isNewArrival=true;", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            if (data.length > 0) {
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where maintag=" + element.maintag, function (data1, err) {
                        if (err) {
                            console.log("Error in store.js", err);
                        } else {
                            element.productMainImage = data1;
                            if (data.length == (ind + 1)) {
                                res.json(data);
                            }
                        }
                    });
                });
            }
            else{
                let test=[];
                res.json(test);
            }
        }
    });
});

router.get("/GetSaleProduct", (req, res, next) => {
    db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name as cat_name  from productmaster p join category c  on c.id = p.category where p.isOnSale=true", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            if (data.length > 0) {
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where maintag=" + element.maintag, function (data1, err) {
                        if (err) {
                            console.log("Error in store.js", err);
                        } else {
                            element.productMainImage = data1;
                            if (data.length == (ind + 1)) {
                                res.json(data);
                            }
                        }
                    });
                });
            }else{
                let test=[];
                res.json(test);
            }
        }
    });
});

router.get("/GetHotProduct", (req, res, next) => {

    db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name as cat_name from productmaster p join category c on c.id = p.category where p.isHot=true", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            if (data.length > 0) {
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where maintag=" + element.maintag, function (data1, err) {
                        if (err) {
                            console.log("Error in store.js", err);
                        } else {
                            element.productMainImage = data1;
                            if (data.length == (ind + 1)) {
                                res.json(data);
                            }
                        }
                    });
                });
            }
            else{
                let test=[];
                res.json(test);
            }
        }
    });
});
router.post("/SaveMainCategory", midway.checkToken,(req, res, next) => {
    console.log(req.body.name);
    db.executeSql("INSERT INTO `category`(`name`,`parent`,`createddate`,`updateddate`,`isactive`)VALUES('" + req.body.name + "'," + req.body.parent + ",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP," + req.body.isactive + ");", function (data, err) {
        if (err) {
            res.json("error");
        } else {
            res.json("success");
        }
    });
});

router.get("/RemoveCartList/:id",  (req, res, next) => {
    console.log("jhsdghgs",req.params.id)
    db.executeSql("Delete from cartlist where id=" + req.params.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.get("/RemoveWishList/:id", midway.checkToken, (req, res, next) => {
    db.executeSql("Delete from wishlist where id=" + req.params.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.post("/SaveBankListCategory", midway.checkToken, (req, res, next) => {
    console.log(req.body.name);
    db.executeSql("INSERT INTO `banklist`(`bankname`)VALUES('" + req.body.bankname + "');", function (data, err) {
        if (err) {
            res.json("error");
        } else {
            res.json("success");
        }
    });
});


router.get("/GetReviewList", (req, res, next) => {
    db.executeSql("select * from ratings ", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.get("/GetBankList", (req, res, next) => {
    db.executeSql("select * from banklist ", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/GetCustomerList", (req, res, next) => {
    db.executeSql("select * from user ", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.post("/GetCustomerById", (req, res, next) => {
    db.executeSql("select * from user where id='" + req.body.id + "'", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/updateCustomerDetails", (req, res, next) => {
    db.executeSql("UPDATE `user` SET firstname='" + req.body.fname + "',lastname='" + req.body.lname + "',email='" + req.body.email + "',contactnumber='" + req.body.contactnumber + "',updateddate=CURRENT_TIMESTAMP WHERE id='" + req.body.id + "';", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/GetMainCategory/:id", (req, res, next) => {
    db.executeSql("select * from category where isactive=1 AND parent =" + req.params.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.post("/UpdateMainCategory", (req, res, next) => {
    db.executeSql("UPDATE   `category` SET name='" + req.body.name + "',updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.post("/UpdateCategory", (req, res, next) => {
    db.executeSql("UPDATE   `category` SET parent=" + req.body.parent + ",name='" + req.body.name + "',updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/RemoveMainCategory/:id", (req, res, next) => {
    db.executeSql("UPDATE   `category` SET updateddate=CURRENT_TIMESTAMP,isactive=0 WHERE id=" + req.params.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.get("/GetWebBanner", (req, res, next) => {
    db.executeSql("select * from webbanners where status=1", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});


router.post("/UpdateReviews", (req, res, next) => {
    // console.log(req.body)
    db.executeSql("UPDATE   `ratings` SET rating=" + req.body.rating + ",comment='" + req.body.comment + "',updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});


router.get("/RemoveReviews/:id", (req, res, next) => {

    db.executeSql("Delete from ratings where id=" + req.params.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})
router.post("/getCatImage", (req, res, next) => {
    console.log("hey");
    db.executeSql("select * from category where id=" + req.body.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });


})
router.post("/GetProductSizeList", (req, res, next) => {
    db.executeSql("select * from quantitywithsize where productid=" + req.body.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})
router.post("/GetNavbarRoutedProducts", (req, res, next) => {
    console.log("herde");
    // console.log(req.body);
    if (req.body.subid != undefined) {
        db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name as cat_name  from productmaster p join category c on c.id = p.category; where p.subCategory=" + req.body.subid, function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                // console.log(data);
                if (data.length > 0) {
                    data.forEach((element, ind) => {
                        db.executeSql("select * from images where maintag=" + element.maintag, function (data1, err) {
                            if (err) {
                                console.log("Error in store.js", err);
                            } else {
                                element.productMainImage = data1;
                                if (data.length == (ind + 1)) {
                                    res.json(data);
                                }
                            }
                        });
                    });
                }
            }
        });
    }
    else {
        db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name as cat_name from productmaster p join category c on c.id = p.category where p.category=" + req.body.catid, function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                if (data.length > 0) {
                    data.forEach((element, ind) => {
                        db.executeSql("select * from images where maintag=" + element.maintag, function (data1, err) {
                            if (err) {
                                console.log("Error in store.js", err);
                            } else {
                                element.productMainImage = data1;
                                if (data.length == (ind + 1)) {
                                    res.json(data);
                                }
                            }
                        });
                    });
                }
            }
        });
    }

})

router.post("/UploadProductImage", (req, res, next) => {
    var imgname = generateUUID();
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'images/products');
        },
        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {
            cb(null, imgname + path.extname(file.originalname));
        }
    });
    let upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        console.log("path=", config.url + 'images/products/' + req.file.filename);
        if (req.fileValidationError) {
            console.log("err1", req.fileValidationError);
            return res.json("err1", req.fileValidationError);
        } else if (!req.file) {
            console.log('Please select an image to upload');
            return res.json('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            console.log("err3");
            return res.json("err3", err);
        } else if (err) {
            console.log("err4");
            return res.json("err4", err);
        }
        return res.json('/images/products/' + req.file.filename);
    });
});

router.post("/UploadMultiProductImage", (req, res, next) => {
    var imgname = generateUUID();
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'images/products');
        },
        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {
            cb(null, imgname + path.extname(file.originalname));
        }
    });
    let upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        db.executeSql("INSERT INTO `images`(`mainCategoryId`,`categoryId`,`subCategoryId`,`productListImage`,`createddate`)VALUES(" + req.body.catid + "," + req.body.subcatid + "," + req.body.grandchild + ",'/images/products/" + req.file.filename + "',CURRENT_TIMESTAMP);", function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {

            }
        });

        if (req.fileValidationError) {
            console.log("err1", req.fileValidationError);
            return res.json("err1", req.fileValidationError);
        } else if (!req.file) {
            console.log('Please select an image to upload');
            return res.json('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            console.log("err3");
            return res.json("err3", err);
        } else if (err) {
            console.log("err4");
            return res.json("err4", err);
        }
        return res.json('/images/products/' + req.file.filename);
    });
});


router.get("/RemoveRecentUoloadImage", (req, res, next) => {
    // console.log(req.body);
    db.executeSql("SELECT * FROM images ORDER BY createddate DESC LIMIT 1", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})
router.post("/SendEmailToUser", (req, res, next) => {
    // console.log(req.body);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'ptlshubham@gmail.com', // generated ethereal user
            pass: 'spiderweb@1', // generated ethereal password
        },
    });
    const output = `
<p>You have new request</p>
<h3>Contact Deails</h3>
<ul>
    <li>Name: ${req.body.name}</i>
    <li>Email: ${req.body.email}</i>
    <li>Contact Number: ${req.body.contact}</i>
</ul>
<h3>Message</h3>
<p>${req.body.message}</p>
<ul>
    <li>Product ID:${req.body.pid}</li>
    <li>Product Name:${req.body.p_name}</li>
    <li>Product Dscripition:${req.body.p_desc}</li>
    
</ul>
   `;
    const mailOptions = {
        from: '"KerYar" <ptlshubham@gmail.com>',
        subject: "Product",
        to: req.body.email,
        Name: '${req.body.name}',
        html: output

    };
    transporter.sendMail(mailOptions, function (error, info) {
        console.log('fgfjfj')
        if (error) {
            console.log(error);
            res.json("Errror");
        } else {
            console.log('Email sent: ' + info.response);
            res.json("success");
        }
    });

});

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
}

module.exports = router;