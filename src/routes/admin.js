const express = require("express");
const router = express.Router();
const db = require("../db/db");
const multer = require('multer');
const path = require('path');
const config = require("../../config");
var midway = require('./midway');
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
const { equal } = require("assert");


router.post("/SaveMainCategory", (req, res, next) => {

    db.executeSql("INSERT INTO `category`(`name`,`parent`,`bannersimage`,`createddate`,`updateddate`,`isactive`)VALUES('" + req.body.name + "'," + req.body.parent + ",'" + req.body.bannersimage + "',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP," + req.body.isactive + ");", function (data, err) {
        console.log(req.err)
        if (err) {
            res.json("error");
        } else {
            // res.json("success");
            db.executeSql("SELECT id FROM category ORDER BY createddate DESC LIMIT 1", function (data1, err) {
                if (err) {
                    console.log("Error in store.js", err);
                } else {
                    db.executeSql("update `category` set bannersimage='" + req.body.bannersimage + "'  where id=" + data1[0].id, function (data, err) {
                        if (err) {
                            console.log("Error in store.js", err);
                        } else {
                            console.log(data);
                            return res.json("success");
                        }
                    });
                }
            });


        }
    });
});
router.post("/SaveBankListCategory", (req, res, next) => {
    console.log(req.body.name);
    db.executeSql("INSERT INTO `banklist`(`bankname`)VALUES('" + req.body.bankname + "');", function (data, err) {
        if (err) {
            res.json("error");
        } else {

            res.json("success");
        }
    });
});

router.get("/GetClothsSize", (req, res, next) => {
    db.executeSql("select * from clothsize ", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
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

router.get("/GetROIList", (req, res, next) => {
    db.executeSql("select e.id,e.bankid,e.months,e.intrest,b.id as BankId,b.bankname from emi e join banklist b on e.bankid=b.id", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/GetOrdersList", (req, res, next) => {
    // console.log('ygyguhguft');
    db.executeSql("select o.id,p.maintag,o.username,o.userid,o.addressid,o.productid,o.quantity,o.transactionid,o.modofpayment,o.total,o.status,o.orderdate,o.deliverydate,p.id as ProductId,p.productName,p.brandName,p.manufacturerName,p.startRating,p.productPrice,p.discountPrice,p.avibilityStatus,p.descripition, ad.address ,ad.city,ad.state,ad.pincode,ad.contactnumber from orders o inner join productmaster p on o.productid=p.id inner join useraddress ad on ad.id = o.addressid where o.status='" + req.body.status + "';", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            if (data.length > 0) {
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where productid=" + element.maintag, function (data1, err) {
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


router.get("/getLowStockProduct",(req,res,next)=>{
    db.executeSql("select * from productmaster where quantity<"+5, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            res.json(data);        
        }
    });
});



router.get("/getTotalEarning",(req,res,next)=>{
    db.executeSql("select * from productmaster where quantity<"+5, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            res.json(data);        
        }
    });
});




router.get("/getTotalOrdersListURL", (req, res, next) => {
    // console.log('ygyguhguft');
    db.executeSql("select o.id,p.maintag,o.username,o.userid,o.addressid,o.productid,o.quantity,o.transactionid,o.modofpayment,o.total,o.status,o.orderdate,o.deliverydate,p.id as ProductId,p.productName,p.brandName,p.manufacturerName,p.startRating,p.productPrice,p.discountPrice,p.avibilityStatus,p.descripition, ad.address ,ad.city,ad.state,ad.pincode,ad.contactnumber from orders o inner join productmaster p on o.productid=p.id inner join useraddress ad on ad.id = o.addressid ;", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            res.json(data);        
        }
    });

});


router.post("/saveShiprocketData", (req, res, next) => {
    console.log("hdhdhudhuduyhduhuydhuhu")
    db.executeSql("INSERT INTO `order_of_shiprocket`( `order_id_system`, `order_id_shiprocket`, `status`, `status_code`, `created_date`) VALUES (" + req.body.system_order_id + "," + req.body.order_id + ",'" + req.body.status + "'," + req.body.status_code + ",CURRENT_TIMESTAMP)", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            res.json(data);
        }
    })
})

router.post("/RemoveROIList", (req, res, next) => {

    console.log(req.body.id);
    db.executeSql("Delete from emi where id=" + req.body.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})
router.get("/GetCustomerList", (req, res, next) => {
    db.executeSql("select * from user ", function (data, err) {
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
    console.log(req.body.bannersimage)
    db.executeSql("UPDATE `category` SET name='" + req.body.name + "',bannersimage='" + req.body.bannersimage + "',updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.post("/UpdateCategory", (req, res, next) => {

    db.executeSql("UPDATE  `category` SET parent=" + req.body.parent + ",bannersimage='" + req.body.bannerimage + "',name='" + req.body.name + "',updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/UpdateOrdersStatus", (req, res, next) => {
    console.log('accept');

    db.executeSql("UPDATE  `orders` SET status='" + req.body.status + "' WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/AcceptUserOrders", (req, res, next) => {
    console.log('accept');

    db.executeSql("UPDATE  `orders` SET status= 'Accepted' WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/ChangeOrdersStatus", (req, res, next) => {
    console.log('accept');

    db.executeSql("UPDATE  `orders` SET status= 'Accepted' WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.get("/GetProductList", (req, res, next) => {

    // db.executeSql("SELECT * FROM `productmaster` pm join category c on c.id = pm.category;", function (data, err) {
    //     if (err) {
    //         console.log("Error in store.js", err);
    //     } else {
    //         if (data.length > 0) {
    //             data.forEach((element, ind) => {
    //                 db.executeSql("select * from images where productid=" + element.maintag, function (data1, err) {
    //                     if (err) {
    //                         console.log("Error in store.js", err);
    //                     } else {
    //                         element.productMainImage = data1;
    //                         if (data.length == (ind + 1)) {
    //                             res.json(data);
    //                         }
    //                     }
    //                 });
    //             });
    //         }
    //     }
    // });

    db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name from productmaster p join category c on c.id = p.category ", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            // return res.json(data);
            if (data.length > 0) {
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where productid=" + element.maintag, function (data1, err) {
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

router.post("/GetProductSizeList", (req, res, next) => {


    db.executeSql("select * from quantitywithsize where productid=" + req.body.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/RemoveMainCategory/:id", (req, res, next) => {
    db.executeSql("UPDATE  `category` SET updateddate=CURRENT_TIMESTAMP,isactive=0 WHERE id=" + req.params.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/GetProductMasterTag", (req, res, next) => {
    db.executeSql("SELECT * FROM `productmaster` order by maintag desc limit 1", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/SaveAddProducts", (req, res, next) => {
    console.log(req.body)
    if (req.body.id == undefined || req.body.id == null) {
        for (let i = 0; i < req.body.selectedSize.length; i++) {
            db.executeSql("INSERT INTO `productmaster`(`maintag`,`mainCategory`, `category`, `subCategory`, `productName`, `brandName`, `manufacturerName`, `productCode`, `productSRNumber`, `productPrice`, `productPer`, `discountPrice`, `quantity`, `size`, `color`, `descripition`, `productDimension`, `itemWeight`, `taxslab`, `emiOptions`, `avibilityStatus`, `relatedProduct`,`startRating`, `isActive`, `createddate`)VALUES(" + req.body.maintag + "," + req.body.mainCategory + "," + req.body.category + "," + req.body.subCategory + ",'" + req.body.productName + "','" + req.body.brandName + "','" + req.body.manufacturerName + "','" + req.body.productCode + "','" + req.body.productSRNumber + "','" + req.body.selectedSize[i].mainPrice + "','" + req.body.selectedSize[i].discountPerc + "','" + req.body.selectedSize[i].discountPrice + "','" + req.body.selectedSize[i].quantity + "','" + req.body.selectedSize[i].selsize + "','" + req.body.selectedSize[i].color + "','" + req.body.descripition + "','" + req.body.productSize + "','" + req.body.itemWeight + "','" + req.body.taxslab + "'," + req.body.emiOptiions + "," + req.body.avibilityStatus + "," + req.body.relatedProduct + "," + req.body.startRating + "," + req.body.isActive + ",CURRENT_TIMESTAMP);", function (data, err) {
                if (err) {
                    console.log("Error in store.js", err);
                } else {
                    if (req.body.multi.length > 0) {
                        for (let i = 0; i < req.body.multi.length; i++) {

                            db.executeSql("INSERT INTO `images`(`productid`,`mainCategoryId`,`categoryId`,`subCategoryId`,`productListImage`,`createddate`)VALUES(" + req.body.maintag + "," + req.body.mainCategory + "," + req.body.category + "," + req.body.subCategory + ",'" + req.body.multi[i] + "',CURRENT_TIMESTAMP);", function (data, err) {
                                if (err) {
                                    console.log("Error in store.js", err);
                                } else {
                                    if (i == req.body.multi.length - 1) {
                                        res.json("success");
                                    }
                                }
                            });
                        }
                    }
                }
            })
        }


    }
    else {
        console.log("in update");
        db.executeSql("UPDATE `productmaster` SET `mainCategory`=" + req.body.mainCategory + ",`category`=" + req.body.category + ",`subCategory`='" + req.body.subCategory + "',`productName`='" + req.body.productName + "',`brandName`='" + req.body.brandName + "',`manufacturerName`='" + req.body.manufacturerName + "',`productCode`='" + req.body.productCode + "',`productSRNumber`='" + req.body.productSRNumber + "',`descripition`='" + req.body.descripition + "',`productDimension`='" + req.body.productDimension + "',`itemWeight`='" + req.body.itemWeight + "',`taxslab`='" + req.body.taxslab + "',`emiOptions`='" + req.body.emiOptions + "',`avibilityStatus`='" + req.body.avibilityStatus + "',`relatedProduct`='" + req.body.relatedProduct + "',`isNewArrival`='" + req.body.isNewArrival + "',`isBestProduct`='" + req.body.isBestProduct + "',`isHot`='" + req.body.isHot + "',`isOnSale`='" + req.body.isOnSale + "',`startRating`='" + req.body.startRating + "',`isActive`='" + req.body.isActive + "',`updateddate`='CURRENT_TIMESTAMP' WHERE maintag=" + req.body.maintag, function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                if (req.body.productMainImage.length > 0) {
                    db.executeSql("delete from images where productid=" + req.body.maintag, function (data1, err) {
                        for (let i = 0; i < req.body.productMainImage.length; i++) {
                            db.executeSql("INSERT INTO `images`(`productid`,`mainCategoryId`,`categoryId`,`subCategoryId`,`productListImage`,`createddate`)VALUES(" + req.body.maintag + "," + req.body.mainCategory + "," + req.body.category + "," + req.body.subCategory + ",'" + req.body.productMainImage[i] + "',CURRENT_TIMESTAMP);", function (data, err) {
                                if (err) {
                                    console.log("Error in store.js", err);
                                } else {
                                    if (i == (req.body.productMainImage.length - 1)) {
                                        res.json("success");
                                    }
                                }
                            });
                        }
                    })
                }


            }
        });
    }

});

router.post("/SaveBulkProductsUpload", (req, res, next) => {
    console.log(req.body)
    for (let i = 0; i < req.body.length; i++) {
        db.executeSql("INSERT INTO `productmaster`(`maintag`,`mainCategory`, `category`, `subCategory`, `productName`, `brandName`, `manufacturerName`, `productCode`, `productSRNumber`, `productPrice`, `productPer`, `discountPrice`, `quantity`, `size`, `color`, `descripition`, `productDimension`, `itemWeight`, `taxslab`, `emiOptions`, `avibilityStatus`, `relatedProduct`,`startRating`, `isActive`, `createddate`)VALUES(" + req.body[i].maintag + "," + req.body[i].mainCategory + "," + req.body[i].category + "," + req.body[i].subCategory + ",'" + req.body[i].productName + "','" + req.body[i].brandName + "','" + req.body[i].manufacturerName + "','" + req.body[i].productCode + "','" + req.body[i].productSRNumber + "'," + req.body[i].productPrice + "," + req.body[i].productPer + "," + req.body[i].discountPrice + "," + req.body[i].quantity + ",'" + req.body[i].size + "','" + req.body[i].color + "','" + req.body[i].descripition + "','" + req.body[i].productDimension + "','" + req.body[i].itemWeight + "'," + req.body[i].taxslab + "," + req.body[i].emiOptions + "," + req.body[i].avibilityStatus + "," + req.body[i].relatedProduct + "," + req.body[i].startRating + ",false,CURRENT_TIMESTAMP);", function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                if (i == (req.body.length - 1)) {
                    return res.json('success');
                }
            }
        })
    }

});
router.post("/SaveBulkProductsImages", (req, res, next) => {
    console.log("here saving");

    for (let i = 0; i < req.body.multi.length; i++) {
        console.log(req.body.multi, 'im in multi')
        db.executeSql("INSERT INTO `images`(`productid`,`mainCategoryId`,`categoryId`,`subCategoryId`,`productListImage`,`createddate`)VALUES(" + req.body.maintag + "," + req.body.mainCategory + "," + req.body.category + "," + req.body.subCategory + ",'" + req.body.multi[i] + "',CURRENT_TIMESTAMP);", function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                if (i == (req.body.multi.length - 1)) {
                    return res.json('success');
                }
            }
        });
    }
    // return res.json('success');
});

router.post("/AddRestockQuantity", (req, res, next) => {
    db.executeSql("UPDATE productmaster SET productPrice=" + req.body.productPrice + ",productPer=" + req.body.productPer + ",discountPrice=" + req.body.discountPrice + ",quantity=" + req.body.quantity + ",size='" + req.body.size + "',updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);

        }
    })
});
router.post("/UpdateReviews", (req, res, next) => {
    console.log(req.body)
    db.executeSql("UPDATE  `ratings` SET rating=" + req.body.rating + ",comment='" + req.body.comment + "',updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});


router.get("/RemoveReviews/:id", (req, res, next) => {

    console.log(req.params.id);
    db.executeSql("Delete from ratings where id=" + req.params.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})
router.get("/RemoveProduct/:id", (req, res, next) => {

    console.log(req.params.id);
    db.executeSql("Delete from productmaster where id=" + req.params.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            db.executeSql("Delete from images where id=" + req.params.id, function (data, err) {
                if (err) {
                    console.log("Error in store.js", err);
                } else {
                    return res.json(data);
                }
            });
        }
    });
})

let secret = 'prnv';
router.post('/login', function (req, res, next) {
    console.log("ggggggg");
    const body = req.body;
    console.log(body);
    var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
    var repass = salt + '' + body.password;
    var encPassword = crypto.createHash('sha1').update(repass).digest('hex');
    db.executeSql("select * from admin where email='" + req.body.email + "';", function (data, err) {
        console.log(data);
        if (data.length > 0) {
            db.executeSql("select * from admin where email='" + req.body.email + "' and password='" + encPassword + "';", function (data1, err) {
                console.log(data1);
                if (data1.length > 0) {

                    module.exports.user1 = {
                        username: data1[0].email, password: data1[0].password
                    }
                    let token = jwt.sign({ username: data1[0].email, password: data1[0].password },
                        secret,
                        {
                            expiresIn: '1h' // expires in 24 hours
                        }
                    );
                    console.log("token=", token);
                    data[0].token = token;

                    res.cookie('auth', token);
                    res.json(data);
                }
                else {
                    return res.json(2);
                }
            });
        }
        else {
            return res.json(1);
        }
    });

});

router.post("/SaveAdminRegister", (req, res, next) => {
    console.log("vdfvfvfv");
    var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
    var repass = salt + '' + req.body.password;
    var encPassword = crypto.createHash('sha1').update(repass).digest('hex');
    db.executeSql("INSERT INTO `admin`(`firstname`,`lastname`,`email`,`password`,`isactive`)VALUES('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.email + "','" + encPassword + "'," + req.body.isactive + ");", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.post("/getProductDetailImage", (req, res, next) => {
    db.executeSql("select * from images where productid=" + req.body.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})
router.post("/SaveWebBanners", (req, res, next) => {

    db.executeSql("INSERT INTO `webbanners`(`name`,`bannersimage`,`status`,`title`,`subtitle`)VALUES('" + req.body.name + "','" + req.body.bannersimage + "'," + req.body.status + ",'" + req.body.title + "','" + req.body.subtitle + "');", function (data, err) {
        if (err) {
            res.json("error");
        } else {
            res.json("success");
        }
    });
});
router.post("/UpdateActiveWebBanners", (req, res, next) => {
    console.log(req.body)
    db.executeSql("UPDATE  `webbanners` SET status=" + req.body.status + " WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.post("/SaveMobileBanners", (req, res, next) => {


    db.executeSql("INSERT INTO `mobilebanners`(`name`,`bannersimage`,`status`)VALUES('" + req.body.name + "','" + req.body.bannersimage + "'," + req.body.status + ");", function (data, err) {
        if (err) {
            console.log(err);
            res.json("error");
        } else {
            res.json("success");
        }
    });
});
router.post("/UpdateActiveMobileBanners", (req, res, next) => {
    console.log(req.body)
    db.executeSql("UPDATE  `mobilebanners` SET status=" + req.body.status + " WHERE id=" + req.body.id + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/GetMobileBanners", (req, res, next) => {
    db.executeSql("select * from mobilebanners ", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/RemoveMobileBanners", (req, res, next) => {
    console.log(req.body.id)
    db.executeSql("Delete from mobilebanners where id=" + req.body.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});


router.post("/getFilterProductList", (req, res, next) => {

    db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name from productmaster p join category c on c.id = p.category where p.mainCategory=" + req.body.maincatid + " OR p.category=" + req.body.catid + " OR p.subCategory=" + req.body.subid + ";", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            // return res.json(data);
            if (data.length > 0) {
                data.forEach((element, ind) => {
                    db.executeSql("select * from images where productid=" + element.maintag, function (data1, err) {
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
router.post("/GetAllFilterProduct", (req, res, next) => {
    if (req.body.filter == 'hot') {
        db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name from productmaster p join category c on c.id = p.category where p.isHot=1", function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                if (data.length > 0) {
                    data.forEach((element, ind) => {
                        db.executeSql("select * from images where productid=" + element.maintag, function (data1, err) {
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
    else if (req.body.filter == 'best') {
        db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name from productmaster p join category c on c.id = p.category where p.isBestProduct=1", function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                if (data.length > 0) {
                    data.forEach((element, ind) => {
                        db.executeSql("select * from images where productid=" + element.maintag, function (data1, err) {
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
    else if (req.body.filter == 'sale') {
        db.executeSql("select p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name from productmaster p join category c on c.id = p.category where p.isOnSale=1", function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                if (data.length > 0) {
                    data.forEach((element, ind) => {
                        db.executeSql("select * from images where productid=" + element.maintag, function (data1, err) {
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
        db.executeSql("sselect p.id as productId, p.maintag,p.mainCategory,p.category,p.subCategory, p.productName,p.brandName,p.manufacturerName,p.productCode,p.productSRNumber,p.productPrice,p.productPer,p.discountPrice,p.quantity,p.soldQuantity,p.size,p.color,p.descripition,p.productDimension,p.itemWeight,p.taxslab,p.emiOptions,p.avibilityStatus,p.relatedProduct,p.isNewArrival,p.isBestProduct,p.isHot,p.isOnSale,p.startRating,p.isActive,c.id as catId,c.name from productmaster p join category c on c.id = p.category where p.isNewArrival=1", function (data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {
                if (data.length > 0) {
                    data.forEach((element, ind) => {
                        db.executeSql("select * from images where productid=" + element.maintag, function (data1, err) {
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


});


router.get("/GetWebBanners", (req, res, next) => {
    console.log(req.body.id)
    db.executeSql("select * from webbanners ", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/RemoveWebBanners", (req, res, next) => {
    console.log(req.id)
    db.executeSql("Delete from webbanners where id=" + req.body.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

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

        console.log("You have uploaded this image");
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
        console.log("path=", config.url + '/images/products/' + req.file.filename);

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
        console.log("You have uploaded this image");
    });
});


router.get("/RemoveRecentUoloadImage", (req, res, next) => {

    db.executeSql("SELECT * FROM images ORDER BY createddate DESC LIMIT 1", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})
router.post("/UploadCategoryBannersImage", (req, res, next) => {
    console.log(req.body)
    var imgname = generateUUID();

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'images/categorybanners/');
        },
        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {

            cb(null, imgname + path.extname(file.originalname));
        }
    });
    let upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        console.log("path=", config.url + 'images/categorybanners/' + req.file.filename);

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
        return res.json('/images/categorybanners/' + req.file.filename);

        console.log("You have uploaded this image");
    });
});
router.post("/UploadBannersImage", (req, res, next) => {
    var imgname = generateUUID();

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'images/banners');
        },
        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {

            cb(null, imgname + path.extname(file.originalname));
        }
    });
    let upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        console.log("path=", config.url + 'images/banners/' + req.file.filename);

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
        return res.json('/images/banners/' + req.file.filename);

        console.log("You have uploaded this image");
    });
});


router.post("/UploadMobileBannersImage", (req, res, next) => {
    var imgname = generateUUID();

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'images/mobilebanners');
        },
        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {

            cb(null, imgname + path.extname(file.originalname));
        }
    });
    let upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        console.log("path=", config.url + 'images/mobilebanners/' + req.file.filename);

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
        return res.json('/images/mobilebanners/' + req.file.filename);

        console.log("You have uploaded this image");
    });
});

router.post("/saveEmioption", (req, res, next) => {

    for (let i = 0; i < req.body.length; i++) {
        db.executeSql("INSERT INTO  `emi`(`bankid`,`months`,`intrest`,`isactive`,`createddate`,`updateddate`)VALUES(" + req.body[i].bankid + "," + req.body[i].months + "," + req.body[i].intrest + ",true,CURRENT_TIMESTAMP,NULL);", function (data, err) {
            if (err) {
                console.log(err);

            } else {

            }
        });
    }

    res.json("success");


});

//filter apis
router.post("/addToNewArrivals", (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        db.executeSql("update  `productmaster` SET isNewArrival=true,isBestProduct=false,isHot=false,isOnSale=false where id=" + req.body[i].productId, function (data, err) {
            if (err) {
                console.log(err);

            } else {

            }
        });
    }
    res.json("success");

});

router.post("/addToBestProduct", (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        db.executeSql("update productmaster SET isNewArrival=false,isBestProduct=true,isHot=false,isOnSale=false where id=" + req.body[i].productId, function (data, err) {
            if (err) {
                console.log(err);

            } else {

            }
        });
    }
    res.json("success");

});
router.post("/addToHotProduct", (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        db.executeSql("update  `productmaster` SET isNewArrival=false,isBestProduct=false,isHot=true,isOnSale=false where id=" + req.body[i].productId, function (data, err) {
            if (err) {
                console.log(err);

            } else {

            }
        });
    }
    res.json("success");

});
router.post("/addToOnSale", (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        db.executeSql("update  `productmaster` SET isNewArrival=false,isBestProduct=false,isHot=false,isOnSale=true where id=" + req.body[i].productId, function (data, err) {
            if (err) {
                console.log(err);

            } else {

            }
        });
    }
    res.json("success");

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