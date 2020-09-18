var express = require('express')
var router = express.Router();
const mysql = require('../model/mysql')
var login = require("../constructor/login")
const Jwt = require('../model/jwtToken')
let jwt = new Jwt()
router.post("/login", (req, res) => {
    if (req.body.username && req.body.password) {
        var sql = `select * from user where user_name = '${req.body.username}' and pass_word = '${req.body.password}'`
        var sqlArr = []
        var callBack = (err, result) => {
            if (err) {
                res.json(login.getCodeNewData(500))
            } else {
                if (result) {
                    let token = jwt.generateToken(result[0])
                    res.setHeader("token", token)
                    res.json(login.getCodeNewData(200, result[0]))
                } else {
                    res.json(login.getCodeNewData(204))
                }
            }
        }
        // var sql = `insert into user values(uuid(),"${req.body.username}","${req.body.password}") `   //注册
        mysql.sqlConnect(sql, sqlArr, callBack)
    }
})
module.exports = router